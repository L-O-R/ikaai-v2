from django.contrib import admin


class BaseAdmin(admin.ModelAdmin):
    """
    Base admin configuration shared across all admin classes.
    """

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 10

    save_on_top = True