from django.urls import path

from .views import JobApplicationCreateAPIView, JobDetailAPIView, JobListAPIView

app_name = "jobs"

urlpatterns = [
    path("", JobListAPIView.as_view(), name="job-list"),
    path("<slug:slug>/", JobDetailAPIView.as_view(), name="job-detail"),
    path("applications/", JobApplicationCreateAPIView.as_view(), name="job-application-create"),
]
