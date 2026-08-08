from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin, ImagePreviewMixin

from .forms import OtherProjectAdminForm, ProjectAdminForm, ProjectStatInlineForm
from .models import OtherProject, Project, ProjectStat


class ProjectStatInline(admin.TabularInline):
    model = ProjectStat
    form = ProjectStatInlineForm
    extra = 0
    verbose_name = "Key Statistic"
    verbose_name_plural = "Key Statistics"
    fields = (
        "title",
        "value",
        "material_symbol",
        "display_order",
        "is_active",
    )
    ordering = ("display_order",)


@admin.register(Project)
class ProjectAdmin(ImagePreviewMixin, BaseAdmin):
    form = ProjectAdminForm
    preview_image_field = "featured_image"
    preview_image_label = "Project featured image"

    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    search_fields = (
        "title",
        "client__name",
    )
    list_filter = (
        "is_featured",
        "is_active",
        "client",
    )
    ordering = ("display_order", "title")
    list_display = (
        "image_preview",
        "title",
        "client",
        "featured_badge",
        "status_badge",
    )
    list_editable = ()
    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "image_preview",
        "slug",
    )
    inlines = (
        ProjectStatInline,
    )

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "client",
                    "featured_image",
                    "image_preview",
                    "introduction",
                )
            },
        ),
        (
            "Project Scope & Metrics",
            {
                "fields": (
                    "coverage",
                    "industry",
                    "scope_of_work",
                    "sample_size",
                )
            },
        ),
        (
            "Publishing & Settings",
            {
                "fields": (
                    "is_featured",
                    "display_order",
                    "is_active",
                )
            },
        ),
        (
            "Metadata",
            {
                "fields": (
                    "id",
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = list(super().get_readonly_fields(request, obj))
        if obj:
            readonly_fields.append("slug")
        return tuple(dict.fromkeys(readonly_fields))

    @admin.display(description="Featured")
    def featured_badge(self, obj):
        if obj.is_featured:
            return format_html('<span class="badge badge-primary">★ Featured</span>')
        return format_html('<span class="badge badge-neutral">Standard</span>')

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Active</span>')
        return format_html('<span class="badge badge-neutral">Inactive</span>')


@admin.register(OtherProject)
class OtherProjectAdmin(BaseAdmin):
    form = OtherProjectAdminForm
    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    search_fields = ("title", "section")
    list_filter = ("is_active",)
    list_display = ("title", "section", "status_badge", "created_at")
    list_editable = ()
    readonly_fields = ("id", "created_at", "updated_at")

    fieldsets = (
        (
            "Project Information",
            {
                "fields": (
                    "title",
                    "section",
                    "description",
                )
            },
        ),
        (
            "Settings",
            {
                "fields": (
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
        return format_html('<span class="badge badge-neutral">Inactive</span>')
