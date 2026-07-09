from __future__ import annotations

from typing import TYPE_CHECKING

from django.utils.text import slugify

if TYPE_CHECKING:
    from .models import Project

MAX_FEATURED_PROJECTS = 4


def validate_featured_projects_limit(project: "Project") -> None:
    """Prevent saving more than four active featured projects."""
    from .models import Project

    if not project.is_featured:
        return

    featured_projects = Project.objects.filter(is_active=True, is_featured=True)
    if project.pk:
        featured_projects = featured_projects.exclude(pk=project.pk)

    if featured_projects.count() >= MAX_FEATURED_PROJECTS:
        raise ValueError("Only four active featured projects are allowed.")


def generate_project_slug(project: "Project") -> str:
    """Generate a unique slug from the project title."""
    from .models import Project

    base_slug = slugify(project.title) or "project"
    slug = base_slug
    suffix = 2

    while Project.objects.filter(slug=slug).exclude(pk=project.pk).exists():
        slug = f"{base_slug}-{suffix}"
        suffix += 1

    return slug
