from django.db import models
from django.urls import reverse

from common.models import BaseModel


class Client(BaseModel):
    """Reusable client organization."""

    name = models.CharField(max_length=200, unique=True)
    section_logo = models.ImageField(
        upload_to="clients/logos/",
        blank=True,
        null=True,
        help_text="Logo displayed in the homepage client section strip.",
    )
    project_logo = models.ImageField(
        upload_to="clients/project-logos/",
        blank=True,
        null=True,
        help_text="Logo displayed on project cards. Falls back to section_logo if empty.",
    )
    client_section_image = models.ImageField(upload_to="clients/sections/", blank=True, null=True)
    project_image = models.ImageField(upload_to="clients/projects/", blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    website = models.URLField(blank=True)

    class Meta:
        ordering = ("display_order", "name")

    def __str__(self) -> str:
        return self.name

    def get_absolute_url(self) -> str:
        return reverse("admin:clients_client_change", args=[self.pk])
