from django.db.models import QuerySet

from .models import Job, JobApplication


def get_active_jobs() -> QuerySet[Job]:
    return Job.objects.filter(is_active=True).order_by("display_order", "title")


def get_featured_jobs() -> QuerySet[Job]:
    return get_active_jobs().filter(featured=True)


def get_job_detail(slug: str) -> Job:
    return get_active_jobs().get(slug=slug)


def get_job_search(queryset: QuerySet[Job] | None = None) -> QuerySet[Job]:
    jobs = queryset or get_active_jobs()
    return jobs


def get_job_applications_for_admin() -> QuerySet[JobApplication]:
    return JobApplication.objects.select_related("job").order_by("-created_at")
