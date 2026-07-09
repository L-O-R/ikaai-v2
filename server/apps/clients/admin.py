from django.contrib import admin

from common.admin import BaseAdmin, ImagePreviewMixin

from .models import Client


@admin.register(Client)
class ClientAdmin(ImagePreviewMixin, BaseAdmin):
    preview_image_field = "logo"
    preview_image_label = "Client logo"

    search_fields = ("name",)
    list_filter = ("is_active",)
    ordering = ("display_order",)
    list_display = (
        "image_preview",
        "name",
        "website",
        "display_order",
        "is_active",
    )
    list_editable = ("display_order",)
    readonly_fields = (
        "created_at",
        "updated_at",
        "image_preview",
    )
