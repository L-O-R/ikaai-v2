"""
Dashboard callback that injects dashboard_stats, quick_links, recent_inquiries,
and recent_applications into the Unfold admin index template context via
UNFOLD["DASHBOARD_CALLBACK"].
"""


def dashboard_callback(request, context):
    """Called by Unfold on every admin index page load."""
    from apps.projects.models import Project
    from apps.clients.models import Client
    from apps.statistics.models import Statistic
    from apps.blogs.models import Blog, BlogStatus
    from apps.inquiries.models import Inquiry
    from apps.updates.models import Update
    from apps.jobs.models import Job, JobApplication

    context["dashboard_stats"] = [
        {
            "label": "Projects",
            "count": Project.objects.count(),
            "sub_label": f"{Project.objects.filter(is_active=True).count()} Active",
            "icon": "folder_open",
            "url": "/admin/projects/project/",
            "add_url": "/admin/projects/project/add/",
        },
        {
            "label": "Clients",
            "count": Client.objects.count(),
            "sub_label": f"{Client.objects.filter(is_active=True).count()} Active",
            "icon": "business",
            "url": "/admin/clients/client/",
            "add_url": "/admin/clients/client/add/",
        },
        {
            "label": "Blog Posts",
            "count": Blog.objects.count(),
            "sub_label": f"{Blog.objects.filter(status=BlogStatus.PUBLISHED).count()} Published",
            "icon": "article",
            "url": "/admin/blogs/blog/",
            "add_url": "/admin/blogs/blog/add/",
        },
        {
            "label": "Inquiries",
            "count": Inquiry.objects.count(),
            "sub_label": f"{Inquiry.objects.filter(is_read=False, is_archived=False).count()} Unread",
            "icon": "mail",
            "url": "/admin/inquiries/inquiry/",
            "add_url": None,
        },
        {
            "label": "Statistics",
            "count": Statistic.objects.count(),
            "sub_label": f"{Statistic.objects.filter(is_active=True).count()} Active",
            "icon": "bar_chart",
            "url": "/admin/statistics/statistic/",
            "add_url": "/admin/statistics/statistic/add/",
        },
        {
            "label": "Updates",
            "count": Update.objects.count(),
            "sub_label": f"{Update.objects.filter(is_active=True).count()} Active",
            "icon": "campaign",
            "url": "/admin/updates/update/",
            "add_url": "/admin/updates/update/add/",
        },
        {
            "label": "Open Jobs",
            "count": Job.objects.count(),
            "sub_label": f"{Job.objects.filter(is_active=True).count()} Active",
            "icon": "work",
            "url": "/admin/jobs/job/",
            "add_url": "/admin/jobs/job/add/",
        },
        {
            "label": "Applications",
            "count": JobApplication.objects.count(),
            "sub_label": f"{JobApplication.objects.filter(status='New').count()} New",
            "icon": "description",
            "url": "/admin/jobs/jobapplication/",
            "add_url": None,
        },
    ]

    context["quick_links"] = [
        {"label": "Add Project",    "icon": "add_circle",  "url": "/admin/projects/project/add/"},
        {"label": "Add Blog Post",  "icon": "edit_note",   "url": "/admin/blogs/blog/add/"},
        {"label": "Add Job",        "icon": "work_history","url": "/admin/jobs/job/add/"},
        {"label": "View Inquiries", "icon": "inbox",       "url": "/admin/inquiries/inquiry/"},
        {"label": "Add Client",     "icon": "domain_add",  "url": "/admin/clients/client/add/"},
        {"label": "Add Update",     "icon": "add_alert",   "url": "/admin/updates/update/add/"},
    ]

    context["recent_inquiries"] = Inquiry.objects.filter(is_archived=False).order_by("-created_at")[:5]
    context["recent_applications"] = JobApplication.objects.select_related("job").order_by("-created_at")[:5]

    return context
