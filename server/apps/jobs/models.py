from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify

from common.models import BaseModel


class EmploymentType(models.TextChoices):
    FULL_TIME = "Full Time", "Full Time"
    PART_TIME = "Part Time", "Part Time"
    INTERNSHIP = "Internship", "Internship"
    CONTRACT = "Contract", "Contract"
    VOLUNTEER = "Volunteer", "Volunteer"


class ExperienceLevel(models.TextChoices):
    FRESHER = "Fresher", "Fresher"
    ZERO_TO_ONE = "0–1 Years", "0–1 Years"
    ONE_TO_THREE = "1–3 Years", "1–3 Years"
    THREE_TO_FIVE = "3–5 Years", "3–5 Years"
    FIVE_PLUS = "5+ Years", "5+ Years"


class ApplicationStatus(models.TextChoices):
    NEW = "New", "New"
    REVIEWED = "Reviewed", "Reviewed"
    SHORTLISTED = "Shortlisted", "Shortlisted"
    REJECTED = "Rejected", "Rejected"
    HIRED = "Hired", "Hired"


class Job(BaseModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    department = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    employment_type = models.CharField(max_length=20, choices=EmploymentType.choices)
    experience_level = models.CharField(max_length=20, choices=ExperienceLevel.choices)
    salary = models.CharField(max_length=255, blank=True)
    openings = models.PositiveIntegerField(default=1)
    description = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True)
    requirements = models.TextField(blank=True)
    benefits = models.TextField(blank=True)
    application_deadline = models.DateField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("display_order", "title")

    def __str__(self) -> str:
        return self.title

    def clean(self) -> None:
        super().clean()
        if not self.slug and self.title:
            self.slug = slugify(self.title)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        self.full_clean()
        return super().save(*args, **kwargs)


class JobApplication(BaseModel):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    current_company = models.CharField(max_length=255, blank=True)
    years_of_experience = models.CharField(max_length=100, blank=True)
    portfolio_url = models.URLField(blank=True)
    resume_drive_link = models.URLField()
    cover_letter = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=ApplicationStatus.choices, default=ApplicationStatus.NEW)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.name} - {self.job.title}"

    def clean(self) -> None:
        super().clean()
        if self.resume_drive_link:
            host = self.resume_drive_link.split("/", 3)[2] if "/" in self.resume_drive_link else ""
            if host not in {"drive.google.com", "docs.google.com"}:
                raise ValidationError({"resume_drive_link": "Resume link must be from Google Drive or Google Docs."})
