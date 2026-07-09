from rest_framework import serializers

from .models import Statistic


class StatisticSerializer(serializers.ModelSerializer):
    """Public statistic representation."""

    class Meta:
        model = Statistic
        fields = (
            "title",
            "value",
            "suffix",
        )
