from django.contrib import admin


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