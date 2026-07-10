from django.urls import path

from ..views import JobApplicationCreateAPIView, JobDetailAPIView, JobListAPIView

app_name = "jobs"

urlpatterns = [
    path("jobs/", JobListAPIView.as_view(), name="job-list"),
    path("jobs/<slug:slug>/", JobDetailAPIView.as_view(), name="job-detail"),
    path("job-applications/", JobApplicationCreateAPIView.as_view(), name="job-application-create"),
]
