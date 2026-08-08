from django.urls import path

from .views import ProjectDetailAPIView, ProjectListAPIView, OtherProjectListAPIView

app_name = "projects"

urlpatterns = [
    path("", ProjectListAPIView.as_view(), name="project-list"),
    path("other/", OtherProjectListAPIView.as_view(), name="other-project-list"),
    path("<slug:slug>/", ProjectDetailAPIView.as_view(), name="project-detail"),
]
