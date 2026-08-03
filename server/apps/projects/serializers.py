from django.utils.text import Truncator
from rest_framework import serializers

from apps.clients.models import Client
from .models import Project, ProjectStat


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            "name",
            "logo",
            "website",
        )


class ProjectStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStat
        fields = (
            "title",
            "value",
            "material_symbol",
        )


class ProjectListSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Project
        fields = (
            "slug",
            "title",
            "featured_image",
            "client",
            "introduction",
            "coverage",
            "industry",
            "scope_of_work",
            "sample_size",
        )


class ProjectDetailSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    statistics = ProjectStatSerializer(source="stats", many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            "slug",
            "title",
            "featured_image",
            "client",
            "introduction",
            "coverage",
            "industry",
            "scope_of_work",
            "sample_size",
            "statistics",
        )
