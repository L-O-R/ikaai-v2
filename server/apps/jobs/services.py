from __future__ import annotations

from typing import Any

from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone

from common.mail import send_notification_email

from .models import Job, JobApplication


class JobApplicationService:
    @staticmethod
    def create_application(validated_data: dict[str, Any]) -> JobApplication:
        job = validated_data["job"]
        if not job.is_active:
            raise ValidationError("Job is not active.")
        if job.application_deadline and timezone.now().date() > job.application_deadline:
            raise ValidationError("Applications for this position are closed.")

        application = JobApplication.objects.create(**validated_data)
        JobApplicationService.send_notification(application)
        return application

    @staticmethod
    def send_notification(application: JobApplication) -> bool:
        recipient = getattr(settings, "HR_NOTIFICATION_EMAIL", "")
        body = (
            f"Job: {application.job.title}\n"
            f"Applicant Name: {application.name}\n"
            f"Email: {application.email}\n"
            f"Phone: {application.phone}\n"
            f"Current Company: {application.current_company or '-'}\n"
            f"Experience: {application.years_of_experience or '-'}\n"
            f"Portfolio: {application.portfolio_url or '-'}\n"
            f"Resume Drive Link: {application.resume_drive_link}\n"
            f"Cover Letter: {application.cover_letter or '-'}\n"
        )
        return send_notification_email(
            subject=f"New Job Application: {application.job.title}",
            body=body,
            recipients=[recipient] if recipient else [],
        )
