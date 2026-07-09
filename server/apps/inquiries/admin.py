from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin

from .models import Inquiry
from .selectors import get_inquiries


@admin.register(Inquiry)
class InquiryAdmin(BaseAdmin):
    search_fields = ("name", "email", "subject")
    list_filter = ("is_read", "is_archived", "created_at")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    list_display = (
        "unread_indicator",
        "name",
        "email",
        "created_at",
        "is_read",
        "is_archived",
    )
    list_display_links = ("name",)
    list_editable = (
        "is_read",
        "is_archived",
    )
    readonly_fields = (
        "name",
        "email",
        "subject",
        "message",
        "created_at",
        "updated_at",
    )
    actions = (
        "mark_read",
        "mark_unread",
        "archive_inquiries",
        "unarchive_inquiries",
    )
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
            "Status",
            {
                "fields": (
                    "is_read",
                    "is_archived",
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

    def get_queryset(self, request):
        return get_inquiries()

    @admin.display(description="Unread")
    def unread_indicator(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="color:var(--color-font-default-light);font-weight:600;">Read</span>'
            )

        return format_html(
            (
                '<span style="display:inline-flex;align-items:center;gap:.4rem;'
                'color:var(--color-primary-600);font-weight:700;">'
                '<span style="width:.55rem;height:.55rem;border-radius:999px;'
                'background:var(--color-primary-600);display:inline-block;"></span>'
                'Unread</span>'
            )
        )

    @admin.action(description="Mark selected inquiries as read")
    def mark_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Mark selected inquiries as unread")
    def mark_unread(self, request, queryset):
        queryset.update(is_read=False)

    @admin.action(description="Archive selected inquiries")
    def archive_inquiries(self, request, queryset):
        queryset.update(is_archived=True)

    @admin.action(description="Unarchive selected inquiries")
    def unarchive_inquiries(self, request, queryset):
        queryset.update(is_archived=False)
