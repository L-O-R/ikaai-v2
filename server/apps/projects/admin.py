from django.contrib import admin

from common.admin import BaseAdmin, ImagePreviewMixin

from .models import Project, ProjectStat


class ProjectStatInline(admin.TabularInline):
    model = ProjectStat
    extra = 0
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
    preview_image_field = "featured_image"
    preview_image_label = "Project featured image"

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
        "is_featured",
        "is_active",
        "display_order",
    )
    list_editable = ("display_order",)
    readonly_fields = (
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
            "Project Information",
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
            "Settings",
            {
                "fields": (
                    "is_featured",
                    "display_order",
                    "is_active",
                )
            },
        ),
        (
            "Audit",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = list(super().get_readonly_fields(request, obj))
        if obj:
            readonly_fields.append("slug")
        return tuple(dict.fromkeys(readonly_fields))
