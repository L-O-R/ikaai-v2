"""
Dashboard callback that injects dashboard_stats and quick_links into the
Unfold admin index template context via UNFOLD["DASHBOARD_CALLBACK"].
"""


def dashboard_callback(request, context):
    """Called by Unfold on every admin index page load."""
    from apps.projects.models import Project
    from apps.clients.models import Client
    from apps.statistics.models import Statistic
    from apps.blogs.models import Blog
    from apps.inquiries.models import Inquiry
    from apps.updates.models import Update
    from apps.jobs.models import Job, JobApplication

    context["dashboard_stats"] = [
        {
            "label": "Projects",
            "count": Project.objects.filter(is_active=True).count(),
            "icon": "folder_open",
            "url": "/admin/projects/project/",
        },
        {
            "label": "Clients",
            "count": Client.objects.filter(is_active=True).count(),
            "icon": "business",
            "url": "/admin/clients/client/",
        },
        {
            "label": "Blog Posts",
            "count": Blog.objects.filter(is_active=True).count(),
            "icon": "article",
            "url": "/admin/blogs/blog/",
        },
        {
            "label": "Unread Inquiries",
            "count": Inquiry.objects.filter(is_read=False, is_archived=False).count(),
            "icon": "mail",
            "url": "/admin/inquiries/inquiry/",
        },
        {
            "label": "Statistics",
            "count": Statistic.objects.filter(is_active=True).count(),
            "icon": "bar_chart",
            "url": "/admin/statistics/statistic/",
        },
        {
            "label": "Updates",
            "count": Update.objects.filter(is_active=True).count(),
            "icon": "campaign",
            "url": "/admin/updates/update/",
        },
        {
            "label": "Open Jobs",
            "count": Job.objects.filter(is_active=True).count(),
            "icon": "work",
            "url": "/admin/jobs/job/",
        },
        {
            "label": "Applications",
            "count": JobApplication.objects.count(),
            "icon": "description",
            "url": "/admin/jobs/jobapplication/",
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

    return context
