from django.db import models
from django.utils import timezone

from common.models import BaseModel


class Update(BaseModel):
    """Public update displayed on the website."""

    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="updates/")
    link = models.URLField()
    display_order = models.PositiveIntegerField(default=0)
    published_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("display_order", "-published_at")

    def __str__(self) -> str:
        return self.title
