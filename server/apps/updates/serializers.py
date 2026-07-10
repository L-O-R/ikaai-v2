from rest_framework import serializers

from .models import Update


class UpdateSerializer(serializers.ModelSerializer):
    """Public update representation."""

    class Meta:
        model = Update
        fields = (
            "title",
            "image",
            "link",
        )
