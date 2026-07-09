from django.contrib import admin

from common.admin import BaseAdmin

from .models import Statistic


@admin.register(Statistic)
class StatisticAdmin(BaseAdmin):
    search_fields = ("title",)
    list_filter = ("is_active",)
    ordering = ("display_order",)
    list_display = (
        "title",
        "value",
        "suffix",
        "display_order",
        "is_active",
    )
    list_editable = (
        "display_order",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
    )
