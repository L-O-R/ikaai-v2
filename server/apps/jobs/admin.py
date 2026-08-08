from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin

from .forms import JobAdminForm, JobApplicationAdminForm
from .models import ApplicationStatus, Job, JobApplication


@admin.register(Job)
class JobAdmin(BaseAdmin):
    form = JobAdminForm
    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    search_fields = ("title", "department", "location")
    list_filter = ("is_active", "featured", "employment_type", "experience_level")
    list_display = (
        "title",
        "department",
        "employment_type",
        "experience_level",
        "application_deadline",
        "status_badge",
        "featured_badge",
    )
    list_editable = ()
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("id", "created_at", "updated_at")
    ordering = ("display_order", "title")
    fieldsets = (
        (
            "Job Details",
            {
                "fields": (
                    "title",
                    "slug",
                    "department",
                    "location",
                    "employment_type",
                    "experience_level",
                    "salary",
                    "openings",
                    "application_deadline",
                )
            },
        ),
        (
            "Job Content",
            {
                "fields": (
                    "description",
                    "responsibilities",
                    "requirements",
                    "benefits",
                )
            },
        ),
        (
            "Visibility & Ordering",
            {
                "fields": (
                    "featured",
                    "display_order",
                    "is_active",
                )
            },
        ),
        (
            "Metadata",
            {
                "fields": ("id", "created_at", "updated_at"),
            },
        ),
    )

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Active</span>')
        return format_html('<span class="badge badge-neutral">Closed</span>')

    @admin.display(description="Featured")
    def featured_badge(self, obj):
        if obj.featured:
            return format_html('<span class="badge badge-primary">★ Featured</span>')
        return format_html('<span class="badge badge-neutral">Standard</span>')


@admin.register(JobApplication)
class JobApplicationAdmin(BaseAdmin):
    form = JobApplicationAdminForm
    search_fields = ("name", "email", "job__title")
    list_filter = ("status", "job")
    list_display = ("applicant_name", "job", "email", "phone", "resume_link", "status_badge", "created_at")
    readonly_fields = (
        "id",
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
    # Bulk status update actions
    actions = ("shortlist", "reject", "mark_hired", "mark_reviewed")
    actions_on_top = True

    # Applications come only from the public form — no manual add
    def has_add_permission(self, request):
        return False

    fieldsets = (
        (
            "Applicant Profile",
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
            "Review & Assessment",
            {"fields": ("status", "notes")},
        ),
        (
            "Metadata",
            {
                "fields": ("id", "created_at", "updated_at"),
            },
        ),
    )

    @admin.display(description="Applicant")
    def applicant_name(self, obj):
        return format_html("<strong>{}</strong>", obj.name)

    @admin.display(description="Resume")
    def resume_link(self, obj):
        if obj.resume_drive_link:
            return format_html(
                '<a href="{}" target="_blank" rel="noopener noreferrer" class="admin-link-chip">'
                '<span class="material-symbols-outlined link-chip-icon">folder_shared</span> View Drive Resume</a>',
                obj.resume_drive_link,
            )
        return "-"

    @admin.display(description="Status")
    def status_badge(self, obj):
        badges = {
            ApplicationStatus.NEW: '<span class="badge badge-info"><span class="badge-dot"></span>New</span>',
            ApplicationStatus.REVIEWED: '<span class="badge badge-warning"><span class="badge-dot"></span>Reviewed</span>',
            ApplicationStatus.SHORTLISTED: '<span class="badge badge-primary"><span class="badge-dot"></span>Shortlisted</span>',
            ApplicationStatus.REJECTED: '<span class="badge badge-danger">Rejected</span>',
            ApplicationStatus.HIRED: '<span class="badge badge-success">✓ Hired</span>',
        }
        return format_html(badges.get(obj.status, '<span class="badge badge-neutral">{}</span>'), obj.status)

    @admin.action(description="Mark selected as Reviewed")
    def mark_reviewed(self, request, queryset):
        queryset.update(status=ApplicationStatus.REVIEWED)

    @admin.action(description="Mark selected as Shortlisted")
    def shortlist(self, request, queryset):
        queryset.update(status=ApplicationStatus.SHORTLISTED)

    @admin.action(description="Mark selected as Rejected")
    def reject(self, request, queryset):
        queryset.update(status=ApplicationStatus.REJECTED)

    @admin.action(description="Mark selected as Hired")
    def mark_hired(self, request, queryset):
        queryset.update(status=ApplicationStatus.HIRED)
