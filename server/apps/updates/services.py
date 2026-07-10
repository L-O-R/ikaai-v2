from django.db.models import QuerySet

from .models import Update
from .selectors import get_active_updates


def list_public_updates() -> QuerySet[Update]:
    """Return public updates for API consumers."""
    return get_active_updates()
