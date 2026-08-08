from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin, ImagePreviewMixin

from .forms import BlogAdminForm, BlogCategoryAdminForm
from .models import Blog, BlogCategory, BlogStatus


@admin.register(BlogCategory)
class BlogCategoryAdmin(BaseAdmin):
    form = BlogCategoryAdminForm
    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    search_fields = ("name",)
    list_filter = ("is_active",)
    ordering = ("display_order", "name")
    list_display = (
        "name",
        "slug",
        "status_badge",
    )
    list_editable = ()
    readonly_fields = (
        "id",
        "slug",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Category Details",
            {
                "fields": (
                    "name",
                    "slug",
                    "description",
                )
            },
        ),
        (
            "Settings",
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

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Active</span>')
        return format_html('<span class="badge badge-neutral">Inactive</span>')


@admin.register(Blog)
class BlogAdmin(ImagePreviewMixin, BaseAdmin):
    form = BlogAdminForm
    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    preview_image_field = "featured_image"
    preview_image_label = "Featured image"

    search_fields = (
        "title",
        "excerpt",
        "category__name",
        "author__email",
    )
    list_filter = (
        "status",
        "category",
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
        "status_badge",
        "featured_badge",
        "reading_time_display",
        "published_at",
    )
    list_editable = ()
    readonly_fields = (
        "id",
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
            "Publishing & Visibility",
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
            "SEO & Metadata",
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
            "System Metadata",
            {
                "fields": (
                    "id",
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.status == BlogStatus.PUBLISHED:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Published</span>')
        return format_html('<span class="badge badge-warning"><span class="badge-dot"></span>Draft</span>')

    @admin.display(description="Featured")
    def featured_badge(self, obj):
        if obj.featured:
            return format_html('<span class="badge badge-primary">★ Featured</span>')
        return format_html('<span class="badge badge-neutral">Standard</span>')

    @admin.display(description="Reading Time")
    def reading_time_display(self, obj):
        return format_html('<span class="badge badge-info">⚡ {} min read</span>', obj.reading_time)

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
