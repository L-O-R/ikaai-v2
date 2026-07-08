from .models import User


def get_user_by_email(email: str) -> User | None:
    """Return a user by email."""
    try:
        return User.objects.get(email=email.strip().lower())
    except User.DoesNotExist:
        return None
