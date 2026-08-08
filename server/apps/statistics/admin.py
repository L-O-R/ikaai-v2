from django.contrib import admin
from django.utils.html import format_html

from common.admin import BaseAdmin

from .forms import StatisticAdminForm
from .models import Statistic


@admin.register(Statistic)
class StatisticAdmin(BaseAdmin):
    form = StatisticAdminForm
    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    search_fields = ("title",)
    list_filter = ("is_active",)
    ordering = ("display_order",)
    list_display = (
        "title",
        "formatted_value",
        "status_badge",
    )
    list_editable = ()
    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Statistic Details",
            {
                "fields": (
                    "title",
                    "value",
                    "suffix",
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
                "fields": ("id", "created_at", "updated_at"),
            },
        ),
    )

    @admin.display(description="Display Value")
    def formatted_value(self, obj):
        return format_html("<strong>{}{}</strong>", obj.value, obj.suffix)

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Active</span>')
        return format_html('<span class="badge badge-neutral">Inactive</span>')
