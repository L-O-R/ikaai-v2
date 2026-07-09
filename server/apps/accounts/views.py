from authlib.integrations.base_client.errors import OAuthError
from django.contrib import admin, messages
from django.contrib.auth import login
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect, render

from .auth.google import authorize_google_redirect, fetch_google_profile
from .services import UserService


def admin_login(request):
    """Render the Google-only admin login page."""
    if request.user.is_authenticated and request.user.is_staff:
        return redirect("admin:index")

    return render(
        request,
        "registration/login.html",
        admin.site.each_context(request),
    )


def google_login(request):
    """Redirect employees to Google OAuth."""
    return authorize_google_redirect(request)


def google_callback(request):
    """Authenticate a Google user and start a Django session."""
    try:
        profile = fetch_google_profile(request)
        user = UserService.sync_google_user(profile)
    except OAuthError:
        request.session.flush()
        messages.error(request, "Your Google login session expired. Please try again.")
        return redirect("/admin/login/")
    except PermissionDenied as exc:
        messages.error(request, str(exc))
        return redirect("/admin/login/")

    login(request, user)
    return redirect("admin:index")
