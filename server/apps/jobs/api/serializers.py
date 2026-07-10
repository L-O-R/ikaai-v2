from rest_framework import serializers

from ..models import JobApplication


class JobApplicationCreateSerializer(serializers.ModelSerializer):
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
