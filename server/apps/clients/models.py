from django.db import models

from common.models import BaseModel


class Client(BaseModel):
    """Reusable client organization."""

    name = models.CharField(max_length=200, unique=True)
    logo = models.ImageField(upload_to="clients/logos/")
    display_order = models.PositiveIntegerField(default=0)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ("display_order", "name")

    def __str__(self) -> str:
        return self.name
