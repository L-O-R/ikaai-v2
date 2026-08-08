from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin, ImagePreviewMixin

from .forms import ClientAdminForm
from .models import Client


@admin.register(Client)
class ClientAdmin(ImagePreviewMixin, BaseAdmin):
    form = ClientAdminForm
    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    preview_image_field = "section_logo"
    preview_image_label = "Section logo"

    search_fields = ("name", "website")
    list_filter = ("is_active",)
    ordering = ("display_order", "name")
    list_display = (
        "image_preview",
        "name",
        "website_link",
        "status_badge",
    )
    list_editable = ()
    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "image_preview",
    )

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "name",
                    "website",
                )
            },
        ),
        (
            "Logos",
            {
                "fields": (
                    "section_logo",
                    "project_logo",
                    "image_preview",
                )
            },
        ),
        (
            "Section & Project Images",
            {
                "fields": (
                    "client_section_image",
                    "project_image",
                )
            },
        ),
        (
            "Visibility & Ordering",
            {
                "fields": (
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

    @admin.display(description="Website")
    def website_link(self, obj):
        if obj.website:
            return format_html(
                '<a href="{}" target="_blank" rel="noopener noreferrer" class="admin-link-chip">'
                '<span class="material-symbols-outlined link-chip-icon">open_in_new</span> Visit</a>',
                obj.website,
            )
        return "-"

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Active</span>')
        return format_html('<span class="badge badge-neutral">Inactive</span>')
