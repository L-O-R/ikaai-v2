from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm

    actions = None
    actions_on_top = False
    actions_on_bottom = False
    actions_selection_counter = False

    list_display = (
        "email",
        "first_name",
        "last_name",
        "designation",
        "status_badge",
        "staff_badge",
    )
    search_fields = (
        "email",
        "first_name",
        "last_name",
    )
    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
        "groups",
    )
    ordering = (
        "first_name",
        "last_name",
    )
    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "last_login",
        "date_joined",
    )
    fieldsets = (
        (
            "Personal Information",
            {
                "fields": (
                    "avatar",
                    "email",
                    "first_name",
                    "last_name",
                    "phone",
                    "designation",
                )
            },
        ),
        (
            "Permissions & Access",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Google Authentication",
            {
                "fields": (
                    "google_sub",
                ),
            },
        ),
        (
            "Metadata & System Info",
            {
                "fields": (
                    "id",
                    "created_at",
                    "updated_at",
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            "Personal Information",
            {
                "classes": ("wide",),
                "fields": (
                    "avatar",
                    "email",
                    "first_name",
                    "last_name",
                    "designation",
                    "phone",
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span class="badge badge-success"><span class="badge-dot"></span>Active</span>')
        return format_html('<span class="badge badge-neutral">Disabled</span>')

    @admin.display(description="Role")
    def staff_badge(self, obj):
        if obj.is_superuser:
            return format_html('<span class="badge badge-danger">Superuser</span>')
        if obj.is_staff:
            return format_html('<span class="badge badge-primary">Staff</span>')
        return format_html('<span class="badge badge-neutral">User</span>')
