from django.utils.text import Truncator
from rest_framework import serializers

from .models import Project, ProjectImage, ProjectStat


class ProjectStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStat
        fields = (
            "title",
            "value",
            "material_symbol",
        )


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = (
            "image",
            "caption",
        )


class ProjectListSerializer(serializers.ModelSerializer):
    client = serializers.CharField(source="client.name", read_only=True)
    client_logo = serializers.SerializerMethodField()
    featured = serializers.BooleanField(source="is_featured", read_only=True)
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "slug",
            "title",
            "cover_image",
            "client",
            "client_logo",
            "location",
            "featured",
            "short_description",
        )

    def get_client_logo(self, obj) -> str | None:
        if not obj.client.logo:
            return None
        return obj.client.logo.url

    def get_short_description(self, obj) -> str:
        return Truncator(obj.description or "").chars(160)


class ProjectDetailSerializer(serializers.ModelSerializer):
    client = serializers.CharField(source="client.name", read_only=True)
    client_logo = serializers.SerializerMethodField()
    featured = serializers.BooleanField(source="is_featured", read_only=True)
    statistics = ProjectStatSerializer(source="stats", many=True, read_only=True)
    gallery = ProjectImageSerializer(source="images", many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            "slug",
            "title",
            "cover_image",
            "client",
            "client_logo",
            "description",
            "location",
            "featured",
            "statistics",
            "gallery",
        )

    def get_client_logo(self, obj) -> str | None:
        if not obj.client.logo:
            return None
        return obj.client.logo.url
