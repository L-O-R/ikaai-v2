
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import path, include
from django.views.generic import RedirectView

from apps.client_public_api import ClientListAPIView
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
    path("api/clients/", ClientListAPIView.as_view(), name="client-list"),
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)