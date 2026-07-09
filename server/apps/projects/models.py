from django.core.exceptions import ValidationError
from django.db import models

from common.models import BaseModel

from .services import generate_project_slug, validate_featured_projects_limit


class Project(BaseModel):
    """Organizational project displayed on the public website."""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    cover_image = models.ImageField(upload_to="projects/cover/")
    client = models.ForeignKey(
        "clients.Client",
        on_delete=models.PROTECT,
        related_name="projects",
    )
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("display_order", "-created_at")

    def __str__(self) -> str:
        return self.title

    def clean(self) -> None:
        super().clean()
        try:
            validate_featured_projects_limit(self)
        except ValueError as exc:
            raise ValidationError({"is_featured": str(exc)}) from exc

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_project_slug(self)

        self.full_clean()
        return super().save(*args, **kwargs)


class ProjectStat(BaseModel):
    """Infographic statistic attached to a project."""

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="stats",
    )
    title = models.CharField(max_length=120)
    value = models.CharField(max_length=50)
    material_symbol = models.CharField(max_length=100)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("display_order",)

    def __str__(self) -> str:
        return self.title


class ProjectImage(BaseModel):
    """Additional gallery image for a project."""

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=255, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("display_order",)

    def __str__(self) -> str:
        return f"{self.project.title} image"
