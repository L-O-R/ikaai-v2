from django import forms

from .models import User


class CustomUserCreationForm(forms.ModelForm):
    """Provision users in the admin without exposing passwords."""

    class Meta:
        model = User
        fields = (
            "avatar",
            "email",
            "first_name",
            "last_name",
            "designation",
            "phone",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        )

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_unusable_password()

        if commit:
            user.save()
            self.save_m2m()

        return user


class CustomUserChangeForm(forms.ModelForm):
    """Update users in the admin without relying on a username field."""

    class Meta:
        model = User
        fields = (
            "avatar",
            "email",
            "first_name",
            "last_name",
            "designation",
            "phone",
            "google_sub",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        )
