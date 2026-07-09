from django.core.exceptions import ValidationError
from django.db import models

from common.models import BaseModel


class Statistic(BaseModel):
    """Organization-wide public statistic."""

    title = models.CharField(max_length=150)
    value = models.PositiveIntegerField()
    suffix = models.CharField(max_length=10, blank=True)
    display_order = models.PositiveIntegerField()

    class Meta:
        ordering = ("display_order",)

    def __str__(self) -> str:
        return self.title

    def clean(self) -> None:
        from .services import validate_statistics_limit

        super().clean()
        try:
            validate_statistics_limit(self)
        except ValueError as exc:
            raise ValidationError({"is_active": str(exc)}) from exc
