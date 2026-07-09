from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .selectors import get_active_statistics
from .serializers import StatisticSerializer


class StatisticListAPIView(ListAPIView):
    """Read-only public statistics endpoint."""

    serializer_class = StatisticSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return get_active_statistics()
