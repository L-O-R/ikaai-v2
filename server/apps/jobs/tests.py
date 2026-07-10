import datetime as dt
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from .models import ApplicationStatus, EmploymentType, ExperienceLevel, Job, JobApplication
from .selectors import get_active_jobs, get_featured_jobs, get_job_detail
from .services import JobApplicationService


class JobsAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.active_job = Job.objects.create(
            title="Frontend Developer",
            department="Engineering",
            location="Delhi",
            employment_type=EmploymentType.FULL_TIME,
            experience_level=ExperienceLevel.ONE_TO_THREE,
            description="Build UI systems",
            is_active=True,
            featured=True,
            display_order=1,
        )
        self.inactive_job = Job.objects.create(
            title="Inactive Job",
            department="Operations",
            location="Mumbai",
            employment_type=EmploymentType.INTERNSHIP,
            experience_level=ExperienceLevel.FRESHER,
            description="Should not show",
            is_active=False,
        )
        self.expired_job = Job.objects.create(
            title="Expired Job",
            department="Research",
            location="Bengaluru",
            employment_type=EmploymentType.CONTRACT,
            experience_level=ExperienceLevel.THREE_TO_FIVE,
            description="Closed",
            is_active=True,
            application_deadline=dt.date.today() - dt.timedelta(days=1),
        )

    def test_job_list_api_returns_active_jobs(self):
        response = self.client.get(reverse("jobs:job-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 2)
        self.assertEqual(response.data["results"][0]["slug"], self.active_job.slug)

    def test_job_detail_api_returns_active_job(self):
        response = self.client.get(reverse("jobs:job-detail", args=[self.active_job.slug]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], self.active_job.title)

    def test_search_and_filtering_work(self):
        response = self.client.get(reverse("jobs:job-list"), {"search": "Delhi", "employment_type": EmploymentType.FULL_TIME})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)

    def test_pagination_is_supported(self):
        for index in range(15):
            Job.objects.create(
                title=f"Job {index}",
                department="Engineering",
                location="Delhi",
                employment_type=EmploymentType.FULL_TIME,
                experience_level=ExperienceLevel.ONE_TO_THREE,
                description="Desc",
                is_active=True,
            )
        response = self.client.get(reverse("jobs:job-list"), {"page_size": 5})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 16)
        self.assertEqual(len(response.data["results"]), 5)

    def test_inactive_jobs_are_hidden(self):
        response = self.client.get(reverse("jobs:job-list"))
        slugs = [item["slug"] for item in response.data["results"]]
        self.assertNotIn(self.inactive_job.slug, slugs)

    def test_expired_jobs_reject_applications(self):
        payload = {
            "job": self.expired_job.slug,
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+919876543210",
            "resume_drive_link": "https://drive.google.com/file/d/abc/view",
        }
        response = self.client.post(reverse("jobs:job-application-create"), payload, format="json")
        self.assertEqual(response.status_code, 400)

    def test_application_validation(self):
        payload = {
            "job": self.active_job.slug,
            "name": "",
            "email": "invalid",
            "phone": "",
            "resume_drive_link": "https://example.com/file",
        }
        response = self.client.post(reverse("jobs:job-application-create"), payload, format="json")
        self.assertEqual(response.status_code, 400)

    def test_drive_link_validation(self):
        payload = {
            "job": self.active_job.slug,
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+919876543210",
            "resume_drive_link": "https://example.com/file",
        }
        response = self.client.post(reverse("jobs:job-application-create"), payload, format="json")
        self.assertContains(response, "resume_drive_link")

    def test_job_application_is_created_and_notification_is_attempted(self):
        with self.settings(HR_NOTIFICATION_EMAIL="hr@example.com"):
            payload = {
                "job": self.active_job.slug,
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+919876543210",
                "current_company": "ABC",
                "years_of_experience": "2 Years",
                "portfolio_url": "https://portfolio.example",
                "resume_drive_link": "https://drive.google.com/file/d/abc/view",
                "cover_letter": "I would love to work with IKAAI.",
            }
            response = self.client.post(reverse("jobs:job-application-create"), payload, format="json")
            self.assertEqual(response.status_code, 201)
            self.assertTrue(JobApplication.objects.filter(email="john@example.com").exists())
            self.assertEqual(JobApplication.objects.get(email="john@example.com").status, ApplicationStatus.NEW)

    def test_selectors_and_service_layer(self):
        self.assertEqual(list(get_active_jobs()), [self.expired_job, self.active_job])
        self.assertEqual(list(get_featured_jobs()), [self.active_job])
        self.assertEqual(get_job_detail(self.active_job.slug), self.active_job)
        app = JobApplicationService.create_application(
            {
                "job": self.active_job,
                "name": "Alice",
                "email": "alice@example.com",
                "phone": "+919876543210",
                "resume_drive_link": "https://docs.google.com/document/d/abc",
            }
        )
        self.assertEqual(app.job, self.active_job)
