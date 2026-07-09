# IKAAI INDIA CMS Server

Backend server for the IKAAI INDIA content management system. The project is a Django 5 application with Django REST Framework APIs, Google-only admin authentication, PostgreSQL storage, media uploads, and an Unfold-powered admin interface.

The server manages website content such as clients, projects, project galleries, project statistics, organization-wide statistics, and public inquiries submitted from the website.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Technology Stack](#technology-stack)
- [Main Features](#main-features)
- [Project Structure](#project-structure)
- [Application Modules](#application-modules)
- [Architecture Rules](#architecture-rules)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [Admin CMS](#admin-cms)
- [Google OAuth Login](#google-oauth-login)
- [CORS Setup](#cors-setup)
- [Public APIs](#public-apis)
- [Media and Static Files](#media-and-static-files)
- [Email Notifications](#email-notifications)
- [Testing](#testing)
- [Deployment Notes](#deployment-notes)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)

## Project Purpose

This server exists to provide a simple, maintainable CMS for the IKAAI INDIA website.

The goals are:

- Keep content editable from Django Admin.
- Expose only the public JSON needed by the website.
- Keep write access restricted to admin users.
- Keep public APIs unauthenticated only where they are safe.
- Keep the codebase easy to extend with more website modules later.

The project intentionally favors clean, predictable Django patterns over unnecessary abstraction.

## Technology Stack

- Python
- Django 5.2
- Django REST Framework
- PostgreSQL
- Authlib for Google OAuth
- django-environ for environment configuration
- django-filter for API filtering
- drf-spectacular dependency is installed for schema support
- django-unfold for the admin UI
- Pillow for image uploads
- django-cors-headers dependency is installed for CORS support
- Gunicorn dependency is installed for production serving
- Whitenoise dependency is installed for static file serving support

## Main Features

- Google OAuth admin login.
- Custom user model using email instead of username.
- Admin-provisioned users only; Google login does not auto-create staff users.
- Project management with cover image, client, description, location, featured flag, and display ordering.
- Project gallery images.
- Per-project statistics with Material Symbols icon names.
- Reusable clients with logos.
- Public inquiry submission endpoint.
- Inquiry email notifications.
- Public organization statistics endpoint.
- Shared base models with UUID primary keys, timestamps, and active/inactive status.
- Public read APIs return active content only.

## Project Structure

```text
server/
  apps/
    accounts/
    clients/
    inquiries/
    projects/
    statistics/
  common/
  config/
    settings/
  media/
  static/
  templates/
  logs/
  manage.py
  requirements.txt
  ARCHITECTURE.md
  README.md
  API_DOCUMENTATION.md
```

## Application Modules

### accounts

Handles admin authentication and user management.

Important behavior:

- Uses a custom `User` model.
- Uses email as the login identifier.
- Disables username-based login.
- Google OAuth is the only supported login flow.
- Users must already exist in the database.
- User must be active.
- User must have staff access.
- The Google subject ID is stored in `google_sub` after first successful login.

Public/admin routes:

- `GET /admin/login/`
- `GET /accounts/google/login/`
- `GET /accounts/google/callback/`

### clients

Stores client organizations used by projects.

Important fields:

- `name`
- `logo`
- `display_order`
- `website`
- `description`
- `is_active`

Important behavior:

- Client name is unique.
- Client deletion is protected when projects reference the client.
- Public API exposes active clients ordered by `display_order` and `name`.

Public route:

- `GET /api/clients/`

### projects

Stores public website projects.

Important fields:

- `title`
- `slug`
- `cover_image`
- `client`
- `description`
- `location`
- `is_featured`
- `display_order`
- `is_active`

Important behavior:

- Slugs are generated from project titles.
- Existing slugs are not regenerated when titles change.
- Slugs are unique.
- Public APIs expose only active projects.
- Maximum 4 active featured projects are allowed.
- Project detail includes gallery images and project statistics.

Public routes:

- `GET /api/projects/`
- `GET /api/projects/<slug>/`

### inquiries

Stores public contact/inquiry form submissions.

Important fields:

- `name`
- `email`
- `subject`
- `message`
- `is_read`
- `is_archived`
- `created_at`

Important behavior:

- Public API is write-only.
- Only `POST` is allowed.
- Empty name, subject, and message values are rejected.
- A notification email is attempted when `CONTACT_NOTIFICATION_EMAIL` is configured.

Public route:

- `POST /api/inquiries/`

### statistics

Stores organization-wide public statistics.

Important fields:

- `title`
- `value`
- `suffix`
- `display_order`
- `is_active`

Important behavior:

- Public API returns active statistics only.
- Public API returns a maximum of 4 statistics.
- Maximum 4 active statistics are allowed.
- Statistics are ordered by `display_order`.

Public route:

- `GET /api/statistics/`

## Architecture Rules

The project follows the structure described in [ARCHITECTURE.md](ARCHITECTURE.md).

Core rules:

- Django apps live inside `apps/`.
- Shared code lives inside `common/`.
- Models define data shape and relationships.
- Views stay thin.
- Business logic goes in `services.py`.
- Database query helpers go in `selectors.py`.
- Admin configuration stays in `admin.py`.
- Public API serializers expose only safe public fields.
- New modules should include an `instruction.md` before implementation.

Common request flow:

```text
HTTP Request
  -> View
  -> Serializer validation
  -> Service
  -> Selector / Model
  -> Database
  -> Response
```

## Requirements

- Python 3.11 or newer is recommended.
- PostgreSQL.
- A Google Cloud OAuth client for admin login.
- A virtual environment.
- Access to the environment variables listed below.

## Environment Variables

Create a `.env` file in the project root.

Do not commit real secrets to version control.

```env
SECRET_KEY=change-this-to-a-long-random-secret
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=ikaai_cms
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

MEDIA_ROOT= /media/

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/accounts/google/callback/

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

FRONTEND_LINK=http://localhost:3000

EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=webmaster@localhost
CONTACT_NOTIFICATION_EMAIL=notifications@example.com
EMAIL_HOST=
EMAIL_PORT=587
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
CREATE_SUPERUSER=false
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=change-this-password
```

### Required Variables

| Variable | Purpose |
| --- | --- |
| `SECRET_KEY` | Django secret key. Must be unique and private. |
| `ALLOWED_HOSTS` | Comma-separated hosts allowed to serve the app. |
| `DB_NAME` | PostgreSQL database name. |
| `DB_USER` | PostgreSQL user. |
| `DB_PASSWORD` | PostgreSQL password. |
| `DB_HOST` | PostgreSQL host. |
| `DB_PORT` | PostgreSQL port. |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret. |
| `GOOGLE_REDIRECT_URI` | Callback URL registered in Google Cloud. |

### Optional Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000,http://127.0.0.1:3000` | Comma-separated frontend origins allowed to call `/api/` routes from a browser. |
| `CSRF_TRUSTED_ORIGINS` | Same as `CORS_ALLOWED_ORIGINS` | Comma-separated origins trusted for CSRF-protected browser requests such as admin/session flows. |
| `FRONTEND_LINK` | `http://localhost:3000` | Frontend URL shown in the admin theme. |
| `EMAIL_BACKEND` | Console backend | Django email backend. |
| `DEFAULT_FROM_EMAIL` | `webmaster@localhost` | Sender email address. |
| `CONTACT_NOTIFICATION_EMAIL` | Empty | Recipient for public inquiry notifications. |
| `EMAIL_HOST` | Empty | SMTP host. |
| `EMAIL_PORT` | `587` | SMTP port. |
| `EMAIL_HOST_USER` | Empty | SMTP username. |
| `EMAIL_HOST_PASSWORD` | Empty | SMTP password. |
| `EMAIL_USE_TLS` | `True` | Enable TLS. |
| `EMAIL_USE_SSL` | `False` | Enable SSL. |

## Local Setup

From the `server` directory:

```bash
python -m venv .venv
```

Activate the environment.

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create and fill the `.env` file.

## Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE ikaai_cms;
```

Run migrations:

```bash
python manage.py migrate
```

Create an admin user:

```bash
python manage.py createsuperuser
```

Because authentication is Google-only, the user email must match the Google account that will log in.

The user must have:

- `is_active=True`
- `is_staff=True`

For full admin access, also set:

- `is_superuser=True`

## Running the Server

Development:

```bash
python manage.py runserver
```

Default local URLs:

- Admin: `http://127.0.0.1:8000/admin/`
- Google login: `http://127.0.0.1:8000/accounts/google/login/`
- Projects API: `http://127.0.0.1:8000/api/projects/`
- Inquiries API: `http://127.0.0.1:8000/api/inquiries/`
- Statistics API: `http://127.0.0.1:8000/api/statistics/`
- Clients API: `http://127.0.0.1:8000/api/clients/`

## Admin CMS

The CMS is available at:

```text
/admin/
```

The login page is customized and uses Google OAuth.

Admin content is managed through Django Admin and the Unfold theme.

Typical content workflow:

1. Create or update clients.
2. Create projects and assign clients.
3. Add project statistics.
4. Add project gallery images.
5. Mark projects as featured when needed.
6. Add organization-wide statistics.
7. Review public inquiries.

## Google OAuth Login

Login flow:

1. Admin visits `/admin/login/`.
2. Admin clicks Google login.
3. Server redirects to Google.
4. Google redirects back to `GOOGLE_REDIRECT_URI`.
5. Server reads the Google OpenID profile.
6. Server finds an existing user by email.
7. Server verifies the user is active and staff.
8. Server stores or verifies `google_sub`.
9. Server starts a Django session.
10. Admin is redirected to Django Admin.

Important rules:

- New users are not created automatically from Google.
- If the email is not already provisioned, login is denied.
- If `google_sub` is already set and does not match, login is denied.
- If the user is inactive, login is denied.
- If the user is not staff, login is denied.

## CORS Setup

CORS is enabled through `django-cors-headers`.

The active settings are:

```python
CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS",
    default=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
)
CORS_URLS_REGEX = r"^/api/.*$"
CSRF_TRUSTED_ORIGINS = env.list(
    "CSRF_TRUSTED_ORIGINS",
    default=CORS_ALLOWED_ORIGINS,
)
```

Important behavior:

- CORS headers are only applied to routes under `/api/`.
- The default allowed browser origins are `http://localhost:3000` and `http://127.0.0.1:3000`.
- Add deployed frontend origins to `CORS_ALLOWED_ORIGINS` as comma-separated values.
- `CSRF_TRUSTED_ORIGINS` defaults to the same origin list and can be overridden separately when needed.
- `corsheaders.middleware.CorsMiddleware` is installed near the top of `MIDDLEWARE`, before Django's common and CSRF middleware.

Example production values:

```env
CORS_ALLOWED_ORIGINS=https://ikaai.org,https://www.ikaai.org
CSRF_TRUSTED_ORIGINS=https://ikaai.org,https://www.ikaai.org
```

## Public APIs

Detailed API contracts are documented in [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

Current public API base path:

```text
/api/
```

Current public endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/projects/` | List active projects. |
| `GET` | `/api/projects/<slug>/` | Get one active project by slug. |
| `POST` | `/api/inquiries/` | Submit a public inquiry. |
| `GET` | `/api/statistics/` | List active public statistics. |
| `GET` | `/api/clients/` | List active clients. |

The current URL configuration does not include an `/api/v1/` prefix. If API versioning is required, add it in `config/urls.py` and update tests/docs together.

## Media and Static Files

Static files:

```text
static/
```

Uploaded media:

```text
media/
```

Configured settings:

- `STATIC_URL = "static/"`
- `STATIC_ROOT = BASE_DIR / "staticfiles"`
- `MEDIA_URL = "/media/"`
- `MEDIA_ROOT = BASE_DIR / "media"`

Project image upload paths:

- Cover images: `projects/cover/`
- Gallery images: `projects/gallery/`
- Client logos: `clients/logos/`
- User avatars: `users/avatars/`

## Email Notifications

Public inquiry creation calls the inquiry service, which attempts to send a plain-text notification email.

Email behavior:

- If `CONTACT_NOTIFICATION_EMAIL` is set, the server sends the inquiry details to that address.
- If no recipient is configured, email sending is skipped and logged.
- If email sending fails, the exception is logged and inquiry creation still succeeds.

The notification includes:

- Name
- Email
- Subject
- Message
- Submitted time

## Testing

Run the test suite:

```bash
python manage.py test
```

Run tests for one app:

```bash
python manage.py test apps.projects
python manage.py test apps.inquiries
python manage.py test apps.statistics
```

Recommended checks before handing off work:

```bash
python manage.py check
python manage.py test
```

## Deployment Notes

For production:

- Use `config.settings.production`.
- Set `DEBUG=False`.
- Use a strong `SECRET_KEY`.
- Set production `ALLOWED_HOSTS`.
- Use production PostgreSQL credentials.
- Use production Google OAuth credentials.
- Register the production callback URL in Google Cloud.
- Configure real SMTP settings if inquiry notifications are required.
- Run migrations before release.
- Run `collectstatic`.
- Serve with Gunicorn or another production WSGI server.
- Serve static and media files correctly.
- Keep `.env` out of version control.

Example production commands:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn config.wsgi:application
```

## Development Guidelines

Follow the existing architecture:

- Add new apps under `apps/`.
- Put shared abstractions in `common/`.
- Keep API serializers explicit.
- Keep views thin.
- Put query logic in selectors.
- Put business rules in services.
- Write focused tests for selectors, services, serializers, and public APIs.
- Do not expose admin-only fields through public serializers.
- Do not create users automatically during Google login.

Before adding a new public API, document:

- Endpoint path.
- HTTP method.
- Authentication requirement.
- Query parameters.
- Request JSON.
- Success response JSON.
- Error response JSON.
- Status codes.

## Troubleshooting

### Google login redirects back but access is denied

Check that:

- The user exists in Django Admin.
- The user email exactly matches the Google account email.
- `is_active` is enabled.
- `is_staff` is enabled.
- `GOOGLE_REDIRECT_URI` matches the Google Cloud OAuth callback.
- Existing `google_sub` does not belong to a different Google account.

### Inquiry submits but no email is received

Check that:

- `CONTACT_NOTIFICATION_EMAIL` is configured.
- SMTP settings are correct.
- `EMAIL_BACKEND` is not set to the console backend in production.
- Server logs do not show email delivery errors.

### Public projects API returns fewer projects than expected

Check that:

- Projects have `is_active=True`.
- The query filters are not excluding data.
- Pagination is not hiding additional results.
- The project client still exists.

### Featured project cannot be saved

Only four active featured projects are allowed. Unfeature or deactivate another project first.

### Statistic cannot be saved as active

Only four active organization statistics are allowed. Deactivate another statistic first.

### API path confusion

The active project routes are mounted under `/api/`, for example `/api/projects/`. The tests currently mention `/api/v1/` in some places, but the live URL configuration does not mount a versioned prefix.
