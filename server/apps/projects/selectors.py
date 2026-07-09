from django.db.models import Prefetch, QuerySet

from .models import Project, ProjectImage, ProjectStat


def get_projects() -> QuerySet[Project]:
    """Return active projects with related data preloaded."""
    return (
        Project.objects.filter(is_active=True)
        .select_related("client")
        .prefetch_related(
            Prefetch("stats", queryset=ProjectStat.objects.order_by("display_order")),
            Prefetch("images", queryset=ProjectImage.objects.order_by("display_order")),
        )
    )


def get_featured_projects() -> QuerySet[Project]:
    """Return active featured projects with related data preloaded."""
    return get_projects().filter(is_featured=True)


def get_project_by_slug(slug: str) -> Project:
    """Return one active project by slug."""
    return get_projects().get(slug=slug)


def get_projects_by_client(client_name: str) -> QuerySet[Project]:
    """Return active projects for a client."""
    return get_projects().filter(client__name__iexact=client_name)
