from django.contrib import admin

from common.admin import BaseAdmin, ImagePreviewMixin

from .forms import BlogAdminForm
from .models import Blog, BlogCategory


@admin.register(BlogCategory)
class BlogCategoryAdmin(BaseAdmin):
    search_fields = ("name",)
    list_filter = ("is_active",)
    ordering = ("display_order", "name")
    list_display = (
        "name",
        "slug",
        "display_order",
        "is_active",
    )
    list_editable = ("display_order",)
    readonly_fields = (
        "slug",
        "created_at",
        "updated_at",
    )


@admin.register(Blog)
class BlogAdmin(ImagePreviewMixin, BaseAdmin):
    form = BlogAdminForm
    preview_image_field = "featured_image"
    preview_image_label = "Featured image"

    search_fields = (
        "title",
        "excerpt",
        "category__name",
        "author__email",
    )
    list_filter = (
        "category",
        "status",
        "featured",
        "published_at",
        "is_active",
    )
    ordering = ("-published_at", "display_order")
    list_display = (
        "image_preview",
        "title",
        "category",
        "author",
        "status",
        "featured",
        "reading_time",
        "published_at",
        "display_order",
    )
    list_editable = (
        "featured",
        "display_order",
    )
    readonly_fields = (
        "slug",
        "reading_time",
        "created_at",
        "updated_at",
        "image_preview",
    )
    autocomplete_fields = (
        "category",
        "author",
    )
    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "excerpt",
                    "category",
                    "author",
                )
            },
        ),
        (
            "Media",
            {
                "fields": (
                    "featured_image",
                    "image_preview",
                )
            },
        ),
        (
            "Content",
            {
                "fields": (
                    "content",
                    "reading_time",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "status",
                    "published_at",
                    "featured",
                    "is_active",
                    "display_order",
                )
            },
        ),
        (
            "SEO",
            {
                "fields": (
                    "meta_title",
                    "meta_description",
                    "og_image",
                    "canonical_url",
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

    class Media:
        css = {
            "all": (
                "https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css",
            )
        }
        js = (
            "https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js",
            "admin/css/blog_markdown_editor.js",
        )
