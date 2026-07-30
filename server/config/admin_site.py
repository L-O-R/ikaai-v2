"""
Custom Django admin site that injects dashboard_stats and quick_links
into the index page context.
"""

from django.contrib.admin.apps import AdminConfig
from unfold.sites import UnfoldAdminSite


class IKAAIAdminConfig(AdminConfig):
    default_site = "config.admin_site.IKAAIAdminSite"


class IKAAIAdminSite(UnfoldAdminSite):
    """Custom Unfold admin site for IKAAI INDIA CMS."""
