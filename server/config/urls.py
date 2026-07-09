
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import path, include
from django.views.generic import RedirectView

from apps.accounts.views import admin_login

urlpatterns = [
    path("admin/login/", admin_login, name="admin_login"),
    path("admin/logout/", LogoutView.as_view(next_page="/admin/login/")),
    path(
        "admin/password_change/",
        RedirectView.as_view(url="/admin/", permanent=False),
    ),
    path(
        "admin/password_change/done/",
        RedirectView.as_view(url="/admin/", permanent=False),
    ),
    path('admin/', admin.site.urls),
    path("accounts/", include("apps.accounts.urls")),
    path("api/statistics/", include("apps.statistics.urls")),
    path("api/projects/", include("apps.projects.urls")),
    path("api/inquiries/", include("apps.inquiries.urls")),
]
