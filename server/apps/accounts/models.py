from django.contrib.auth.models import AbstractUser
from django.db import models

from common.models import TimeStampedModel, UUIDModel
from .managers import UserManager


class User(AbstractUser, UUIDModel, TimeStampedModel):
    """
    Custom user model
    """

    username = None

    email = models.EmailField(
        unique=True,
    )

    avatar = models.ImageField(
        upload_to="users/avatars/",
        blank=True,
        null=True,
    )

    designation = models.CharField(
        max_length=100,
        blank=True,
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
    )

    google_sub = models.CharField(
        max_length=255,
        unique=True,
        blank=True,
        null=True,
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        ordering = ["first_name", "last_name"]

    def __str__(self):
        return self.email