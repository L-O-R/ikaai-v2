from django.contrib import admin
from django.utils.html import format_html


class BaseAdmin(admin.ModelAdmin):
    """
    Base admin shared by all CMS models.
    - One save bar (bottom only, no top duplication)
    - Actions strip hidden by default (enable per-admin where bulk actions exist)
    - Audit fields always collapsed via a shared mixin
    """

    list_per_page = 25
    save_on_top = False
    show_add_link = True

    # Show audit timestamps as read-only on every model
    readonly_fields = ("created_at", "updated_at")

    ordering = ("-created_at",)

    # Hide the action bar globally; re-enable per admin where bulk actions are defined
    actions = []
    actions_on_top = False
    actions_on_bottom = False

    # Collapsible audit fieldset — append to child fieldsets or use standalone
    AUDIT_FIELDSET = (
        "Metadata & History",
        {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",),
        },
    )


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
            return format_html('<span class="badge badge-neutral">No image</span>')

        return format_html(
            (
                '<div class="admin-image-preview">'
                '<img src="{}" alt="{}" '
                'style="max-width:{}px;max-height:54px;object-fit:cover;'
                'border-radius:6px;border:1px solid var(--admin-border);" />'
                '</div>'
            ),
            image.url,
            self.preview_image_label,
            self.preview_image_width,
        )

    image_preview.short_description = "Preview"
