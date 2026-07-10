import math
import re
from typing import TYPE_CHECKING

from django.utils import timezone
from django.utils.text import slugify

if TYPE_CHECKING:
    from .models import Blog, BlogCategory

WORDS_PER_MINUTE = 200


def strip_markdown(markdown: str) -> str:
    """Return readable text from common Markdown syntax."""
    text = re.sub(r"```[\s\S]*?```", " ", markdown or "")
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_~>#|\\-]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def calculate_reading_time(markdown: str) -> int:
    """Estimate reading time from Markdown content."""
    word_count = len(strip_markdown(markdown).split())
    return max(1, math.ceil(word_count / WORDS_PER_MINUTE))


def generate_blog_slug(blog: "Blog") -> str:
    """Generate a unique blog slug from the title."""
    from .models import Blog

    base_slug = slugify(blog.title) or "blog"
    slug = base_slug
    suffix = 2

    while Blog.objects.filter(slug=slug).exclude(pk=blog.pk).exists():
        slug = f"{base_slug}-{suffix}"
        suffix += 1

    return slug


def generate_category_slug(category: "BlogCategory") -> str:
    """Generate a unique category slug from the name."""
    from .models import BlogCategory

    base_slug = slugify(category.name) or "category"
    slug = base_slug
    suffix = 2

    while BlogCategory.objects.filter(slug=slug).exclude(pk=category.pk).exists():
        slug = f"{base_slug}-{suffix}"
        suffix += 1

    return slug


def ensure_published_at(blog: "Blog") -> None:
    """Set a publish date when a blog is first marked published."""
    from .models import BlogStatus

    if blog.status == BlogStatus.PUBLISHED and not blog.published_at:
        blog.published_at = timezone.now()


def publish_blog(blog: "Blog") -> "Blog":
    """Publish a draft blog and keep room for future scheduling rules."""
    from .models import BlogStatus

    blog.status = BlogStatus.PUBLISHED
    ensure_published_at(blog)
    blog.save(update_fields=("status", "published_at", "updated_at", "reading_time"))
    return blog
