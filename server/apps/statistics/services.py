from .models import Statistic

MAX_ACTIVE_STATISTICS = 5


def validate_statistics_limit(statistic: Statistic) -> None:
    """Prevent saving more than five active statistics."""
    if not statistic.is_active:
        return

    active_statistics = Statistic.objects.filter(is_active=True)

    if statistic.pk:
        active_statistics = active_statistics.exclude(pk=statistic.pk)

    if active_statistics.count() >= MAX_ACTIVE_STATISTICS:
        raise ValueError("Only five active statistics are allowed.")
