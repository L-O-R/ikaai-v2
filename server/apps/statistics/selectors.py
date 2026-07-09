from django.db.models import QuerySet

from .models import Statistic


def get_active_statistics() -> QuerySet[Statistic]:
    """Return active statistics ordered for public display."""
    return Statistic.objects.filter(is_active=True).order_by("display_order")[:4]
