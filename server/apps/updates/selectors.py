from django.db.models import QuerySet

from .models import Update


def get_active_updates() -> QuerySet[Update]:
    """Return active updates ordered for public display."""
    return (
        Update.objects.filter(is_active=True)
        .only("title", "image", "link", "display_order", "published_at")
        .order_by("display_order", "-published_at")
    )
