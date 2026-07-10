from django.db.models import QuerySet

from .models import Blog, BlogCategory, BlogStatus


def get_active_categories() -> QuerySet[BlogCategory]:
    """Return active categories ordered for public display."""
    return BlogCategory.objects.filter(is_active=True).order_by("display_order", "name")


def get_blogs() -> QuerySet[Blog]:
    """Return published blogs for public APIs."""
    return (
        Blog.objects.filter(is_active=True, status=BlogStatus.PUBLISHED)
        .select_related("category", "author")
        .order_by("display_order", "-published_at", "-created_at")
    )


def get_featured_blogs() -> QuerySet[Blog]:
    """Return published featured blogs."""
    return get_blogs().filter(featured=True)


def get_blog_by_slug(slug: str) -> Blog:
    """Return one published blog by slug."""
    return get_blogs().get(slug=slug)


def get_related_blogs(blog: Blog) -> QuerySet[Blog]:
    """Return up to three published blogs from the same category."""
    if not blog.category_id:
        return Blog.objects.none()

    return get_blogs().filter(category=blog.category).exclude(pk=blog.pk)[:3]
