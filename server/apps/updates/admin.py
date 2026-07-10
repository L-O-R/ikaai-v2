from django.contrib import admin

from common.admin import BaseAdmin, ImagePreviewMixin

from .models import Update


@admin.register(Update)
class UpdateAdmin(ImagePreviewMixin, BaseAdmin):
    preview_image_field = "image"
    preview_image_label = "Update image"

    search_fields = ("title",)
    list_filter = ("is_active",)
    ordering = ("display_order", "-published_at")
    list_display = (
        "image_preview",
        "title",
        "link",
        "display_order",
        "published_at",
        "is_active",
    )
    list_editable = ("display_order",)
    readonly_fields = (
        "created_at",
        "updated_at",
        "image_preview",
    )
    fieldsets = (
        (
            "Update",
            {
                "fields": (
                    "title",
                    "image",
                    "image_preview",
                    "link",
                    "published_at",
                )
            },
        ),
        (
            "Visibility",
            {
                "fields": (
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
