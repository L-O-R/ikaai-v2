from typing import Any

from django.core.exceptions import PermissionDenied

from .models import User
from .selectors import get_user_by_email


class UserService:
    """Coordinate account business rules."""

    @classmethod
    def sync_google_user(cls, profile: dict[str, Any]) -> User:
        """Authenticate an admin-provisioned user from a Google profile."""
        email = cls._get_email(profile)
        google_sub = cls._get_google_sub(profile)

        user = cls._validate_user(get_user_by_email(email), google_sub)
        cls._update_google_profile(user, profile, google_sub)

        return user

    @staticmethod
    def _get_email(profile: dict[str, Any]) -> str:
        email = profile.get("email", "")
        if not email:
            raise PermissionDenied("Google account did not provide an email.")
        return str(email).strip().lower()

    @staticmethod
    def _get_google_sub(profile: dict[str, Any]) -> str:
        google_sub = profile.get("sub", "")
        if not google_sub:
            raise PermissionDenied("Google account did not provide a subject ID.")
        return str(google_sub)

    @staticmethod
    def _validate_user(user: User | None, google_sub: str) -> User:
        if user is None:
            raise PermissionDenied(
                "Your account has not been provisioned. "
                "Please contact the administrator."
            )

        if not user.is_active:
            raise PermissionDenied("Your account is inactive.")

        if not user.is_staff:
            raise PermissionDenied("Your account does not have CMS access.")

        if user.google_sub and user.google_sub != google_sub:
            raise PermissionDenied(
                "This Google account does not match the provisioned account."
            )

        return user

    @staticmethod
    def _update_google_profile(
        user: User,
        profile: dict[str, Any],
        google_sub: str,
    ) -> None:
        user.email = str(profile["email"]).strip().lower()
        user.first_name = str(profile.get("given_name", "")).strip()
        user.last_name = str(profile.get("family_name", "")).strip()
        user.google_sub = google_sub
        user.save(
            update_fields=[
                "email",
                "first_name",
                "last_name",
                "google_sub",
                "updated_at",
            ]
        )
