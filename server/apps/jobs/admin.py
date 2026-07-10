from django.contrib import admin

from common.admin import BaseAdmin

from .models import Job, JobApplication


@admin.register(Job)
class JobAdmin(BaseAdmin):
    search_fields = ("title", "department", "location")
    list_filter = ("is_active", "featured", "employment_type", "experience_level")
    list_display = (
        "title",
        "department",
        "employment_type",
        "application_deadline",
        "featured",
        "is_active",
    )
    list_editable = ("featured", "is_active")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("display_order", "title")


@admin.register(JobApplication)
class JobApplicationAdmin(BaseAdmin):
    search_fields = ("name", "email", "job__title")
    list_filter = ("status", "job")
    list_display = ("name", "job", "email", "status", "created_at")
    readonly_fields = (
        "job",
        "name",
        "email",
        "phone",
        "current_company",
        "years_of_experience",
        "portfolio_url",
        "resume_drive_link",
        "cover_letter",
        "created_at",
        "updated_at",
    )
    fieldsets = (
        (
            "Applicant",
            {
                "fields": (
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
            },
        ),
        (
            "Admin Review",
            {"fields": ("status", "notes")},
        ),
        (
            "Audit",
            {"fields": ("created_at", "updated_at")},
        ),
    )
