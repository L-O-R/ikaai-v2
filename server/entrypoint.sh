#!/bin/sh
set -e

sleep 2

python manage.py migrate --noinput
python manage.py collectstatic --noinput

if [ "$CREATE_SUPERUSER" = "true" ]; then
    python manage.py shell <<EOF
from django.contrib.auth import get_user_model

User = get_user_model()
email = "${DJANGO_SUPERUSER_EMAIL}"
password = "${DJANGO_SUPERUSER_PASSWORD}"

if email and password:
    if not User.objects.filter(email=email).exists():
        print(f"Creating superuser: {email}")
        User.objects.create_superuser(
            email=email,
            password=password,
        )
    else:
        print(f"Superuser already exists: {email}")
EOF
fi

PORT="${PORT:-8000}"
WEB_CONCURRENCY="${WEB_CONCURRENCY:-3}"
GUNICORN_TIMEOUT="${GUNICORN_TIMEOUT:-120}"

exec gunicorn config.wsgi:application \
    --bind "0.0.0.0:${PORT}" \
    --workers "${WEB_CONCURRENCY}" \
    --timeout "${GUNICORN_TIMEOUT}" \
    --access-logfile - \
    --error-logfile -
