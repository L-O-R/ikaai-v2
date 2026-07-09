import logging
from collections.abc import Iterable

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger(__name__)


def send_notification_email(
    subject: str,
    body: str,
    recipients: Iterable[str],
    from_email: str | None = None,
) -> bool:
    """Send a plain text notification email and log failures."""
    recipient_list = [recipient.strip() for recipient in recipients if recipient and recipient.strip()]

    if not recipient_list:
        logger.warning("Notification email skipped because no recipients were configured.")
        return False

    message = EmailMessage(
        subject=subject,
        body=body,
        from_email=from_email or settings.DEFAULT_FROM_EMAIL,
        to=recipient_list,
    )

    try:
        message.send(fail_silently=False)
        return True
    except Exception:
        logger.exception("Failed to send notification email: %s", subject)
        return False
