from django.contrib import admin

from common.admin import BaseAdmin, ImagePreviewMixin

from .models import Project, ProjectImage, ProjectStat


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


class ProjectImageInline(ImagePreviewMixin, admin.TabularInline):
    model = ProjectImage
    extra = 0
    preview_image_field = "image"
    preview_image_label = "Project image"
    fields = (
        "image_preview",
        "image",
        "caption",
        "display_order",
        "is_active",
    )
    readonly_fields = ("image_preview",)
    ordering = ("display_order",)


@admin.register(Project)
class ProjectAdmin(ImagePreviewMixin, BaseAdmin):
    preview_image_field = "cover_image"
    preview_image_label = "Project cover"

    search_fields = (
        "title",
        "client__name",
        "location",
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
        "location",
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
        ProjectImageInline,
    )

    fieldsets = (
        (
            "Project",
            {
                "fields": (
                    "title",
                    "slug",
                    "client",
                    "cover_image",
                    "image_preview",
                    "description",
                    "location",
                )
            },
        ),
        (
            "Visibility",
            {
                "fields": (
                    "is_featured",
                    "is_active",
                    "display_order",
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
