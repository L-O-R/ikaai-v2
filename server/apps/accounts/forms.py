from django import forms

from .models import User


USER_WIDGETS = {
    "email": forms.EmailInput(
        attrs={"placeholder": "e.g. admin@ikaai.com"}
    ),
    "first_name": forms.TextInput(
        attrs={"placeholder": "e.g. Ananya"}
    ),
    "last_name": forms.TextInput(
        attrs={"placeholder": "e.g. Verma"}
    ),
    "designation": forms.TextInput(
        attrs={"placeholder": "e.g. Senior Content Strategist"}
    ),
    "phone": forms.TextInput(
        attrs={"placeholder": "e.g. +91 9876543210"}
    ),
    "google_sub": forms.TextInput(
        attrs={"placeholder": "Google Unique Account ID (auto-linked)"}
    ),
}

USER_HELP_TEXTS = {
    "avatar": "User profile avatar photo.",
    "email": "Primary login email address and notification inbox.",
    "first_name": "User given name.",
    "last_name": "User surname.",
    "designation": "Job title or role within IKAAI India.",
    "phone": "Direct phone or mobile contact number.",
    "google_sub": "Google OAuth subject identifier for Single Sign-On.",
    "is_active": "Designates whether this account should be treated as active.",
    "is_staff": "Designates whether the user can log into this admin site.",
    "is_superuser": "Designates that this user has all permissions without explicitly assigning them.",
    "groups": "The groups this user belongs to.",
    "user_permissions": "Specific permissions for this user.",
}


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
        widgets = USER_WIDGETS
        help_texts = USER_HELP_TEXTS

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
        widgets = USER_WIDGETS
        help_texts = USER_HELP_TEXTS
