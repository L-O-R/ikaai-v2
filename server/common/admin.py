from django.contrib import admin
from django.utils.html import format_html


class BaseAdmin(admin.ModelAdmin):
    """
    Base admin shared by all CMS models.
    """

    list_per_page = 25

    save_on_top = True

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    actions_on_top = True
    actions_on_bottom = False


class ImagePreviewMixin:
    """
    Reusable image preview helper for admin classes and inlines.
    """

    preview_image_field = ""
    preview_image_label = "Preview"
    preview_image_width = 96

    def image_preview(self, obj):
        image = getattr(obj, self.preview_image_field, None)
        if not image:
            return "-"

        return format_html(
            (
                '<img src="{}" alt="{}" '
                'style="max-width:{}px;max-height:64px;object-fit:cover;'
                'border-radius:8px;border:1px solid var(--admin-border);" />'
            ),
            image.url,
            self.preview_image_label,
            self.preview_image_width,
        )

    image_preview.short_description = "Image Preview"
