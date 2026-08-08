from django.db.models import QuerySet
from rest_framework import serializers
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from apps.clients.models import Client


def get_active_clients() -> QuerySet[Client]:
    """Return active clients ordered for public display."""
    return Client.objects.filter(is_active=True).order_by("display_order", "name")


class ClientSerializer(serializers.ModelSerializer):
    """Public client representation."""

    class Meta:
        model = Client
        fields = (
            "name",
            "section_logo",
            "project_logo",
            "client_section_image",
            "project_image",
            "website",
        )


class ClientListAPIView(ListAPIView):
    """Read-only public clients endpoint."""

    serializer_class = ClientSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return get_active_clients()
