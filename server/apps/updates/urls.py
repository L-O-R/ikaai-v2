from django.urls import path

from .views import UpdateListAPIView

app_name = "updates"

urlpatterns = [
    path("", UpdateListAPIView.as_view(), name="update-list"),
]
