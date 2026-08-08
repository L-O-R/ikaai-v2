from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin

from .forms import InquiryAdminForm
from .models import Inquiry
from .selectors import get_inquiries


@admin.register(Inquiry)
class InquiryAdmin(BaseAdmin):
    form = InquiryAdminForm
    search_fields = ("name", "email", "subject", "message")
    list_filter = ("is_read", "is_archived", "created_at")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    list_display = (
        "unread_indicator",
        "name",
        "email",
        "subject",
        "message_preview",
        "created_at",
        "archive_badge",
    )
    list_display_links = ("name", "subject")
    list_editable = ()
    readonly_fields = (
        "id",
        "name",
        "email",
        "subject",
        "message",
        "created_at",
        "updated_at",
    )
    # Bulk actions — re-enable the action bar for this model
    actions = ("mark_read", "mark_unread", "archive_inquiries", "unarchive_inquiries")
    actions_on_top = True

    # Inquiries arrive only from the public form — no manual add
    def has_add_permission(self, request):
        return False

    fieldsets = (
        (
            "Inquiry Details",
            {
                "fields": (
                    "name",
                    "email",
                    "subject",
                    "message",
                )
            },
        ),
        (
            "Status & Archive",
            {
                "fields": (
                    "is_read",
                    "is_archived",
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

    def get_queryset(self, request):
        return get_inquiries()

    @admin.display(description="Status")
    def unread_indicator(self, obj):
        if obj.is_read:
            return format_html('<span class="badge badge-neutral">Read</span>')
        return format_html(
            '<span class="badge badge-primary" aria-label="Unread inquiry"><span class="badge-dot"></span>Unread</span>'
        )

    @admin.display(description="Archive State")
    def archive_badge(self, obj):
        if obj.is_archived:
            return format_html('<span class="badge badge-neutral">Archived</span>')
        return format_html('<span class="badge badge-success">Active</span>')

    @admin.display(description="Message Preview")
    def message_preview(self, obj):
        if len(obj.message) > 60:
            return f"{obj.message[:60]}..."
        return obj.message

    @admin.action(description="Mark selected as read")
    def mark_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Mark selected as unread")
    def mark_unread(self, request, queryset):
        queryset.update(is_read=False)

    @admin.action(description="Archive selected")
    def archive_inquiries(self, request, queryset):
        queryset.update(is_archived=True)

    @admin.action(description="Unarchive selected")
    def unarchive_inquiries(self, request, queryset):
        queryset.update(is_archived=False)
