from django.conf import settings
from django.db import models

from common.models import BaseModel


class BlogStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    PUBLISHED = "published", "Published"


class BlogCategory(BaseModel):
    """Reusable category for organizing blog articles."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.CharField(max_length=300, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("display_order", "name")
        verbose_name_plural = "Blog categories"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        from .services import generate_category_slug

        if not self.slug:
            self.slug = generate_category_slug(self)
        return super().save(*args, **kwargs)


class Blog(BaseModel):
    """Long-form Markdown article managed through the CMS."""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    excerpt = models.CharField(max_length=500)
    featured_image = models.ImageField(upload_to="blogs/")
    content = models.TextField()
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        related_name="blogs",
        blank=True,
        null=True,
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="blogs",
        blank=True,
        null=True,
    )
    status = models.CharField(
        max_length=20,
        choices=BlogStatus.choices,
        default=BlogStatus.DRAFT,
    )
    published_at = models.DateTimeField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)
    og_image = models.ImageField(upload_to="blogs/og/", blank=True, null=True)
    canonical_url = models.URLField(blank=True)
    reading_time = models.PositiveIntegerField(default=1, editable=False)

    class Meta:
        ordering = ("display_order", "-published_at", "-created_at")

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        from .services import calculate_reading_time, ensure_published_at, generate_blog_slug

        if not self.slug:
            self.slug = generate_blog_slug(self)
        self.reading_time = calculate_reading_time(self.content)
        ensure_published_at(self)
        return super().save(*args, **kwargs)
