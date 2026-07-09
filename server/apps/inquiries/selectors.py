from django.db.models import QuerySet

from .models import Inquiry


def get_inquiries() -> QuerySet[Inquiry]:
    """Return all inquiries ordered by newest first."""
    return Inquiry.objects.all().order_by("-created_at")


def get_unread_inquiries() -> QuerySet[Inquiry]:
    """Return unread inquiries ordered by newest first."""
    return get_inquiries().filter(is_read=False)


def get_archived_inquiries() -> QuerySet[Inquiry]:
    """Return archived inquiries ordered by newest first."""
    return get_inquiries().filter(is_archived=True)


def get_recent_inquiries() -> QuerySet[Inquiry]:
    """Return a small recent inquiry slice for lightweight inbox usage."""
    return get_inquiries()[:10]
