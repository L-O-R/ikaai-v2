from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .serializers import UpdateSerializer
from .services import list_public_updates


class UpdateListAPIView(ListAPIView):
    """Read-only public updates endpoint."""

    serializer_class = UpdateSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return list_public_updates()
