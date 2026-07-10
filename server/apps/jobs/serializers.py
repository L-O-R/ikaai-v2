from django.utils import timezone
from rest_framework import serializers

from .models import Job, JobApplication
from .selectors import get_active_jobs


class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "title",
            "slug",
            "department",
            "location",
            "employment_type",
            "experience_level",
            "salary",
            "description",
            "application_deadline",
            "featured",
        )


class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "title",
            "department",
            "location",
            "employment_type",
            "experience_level",
            "salary",
            "openings",
            "description",
            "responsibilities",
            "requirements",
            "benefits",
            "application_deadline",
        )


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    job = serializers.SlugRelatedField(slug_field="slug", queryset=get_active_jobs(), required=True)

    class Meta:
        model = JobApplication
        fields = (
            "job",
            "name",
            "email",
            "phone",
            "current_company",
            "years_of_experience",
            "portfolio_url",
            "resume_drive_link",
            "cover_letter",
        )

    def validate_name(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_phone(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Phone is required.")
        return value

    def validate_portfolio_url(self, value: str) -> str:
        if value and not value.startswith(("http://", "https://")):
            raise serializers.ValidationError("Enter a valid URL.")
        return value

    def validate_resume_drive_link(self, value: str) -> str:
        if not value:
            raise serializers.ValidationError("Resume Drive Link is required.")
        if not value.startswith(("http://", "https://")):
            raise serializers.ValidationError("Enter a valid URL.")
        host = value.split("/", 3)[2] if "/" in value else ""
        if host not in {"drive.google.com", "docs.google.com"}:
            raise serializers.ValidationError("Resume link must be from Google Drive or Google Docs.")
        return value

    def validate_job(self, value: Job) -> Job:
        if not value.is_active:
            raise serializers.ValidationError("Job is not active.")
        if value.application_deadline and timezone.now().date() > value.application_deadline:
            raise serializers.ValidationError("Applications for this position are closed.")
        return value

    def create(self, validated_data):
        return JobApplication.objects.create(**validated_data)
