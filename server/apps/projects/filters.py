import django_filters

from .models import Project


class ProjectFilter(django_filters.FilterSet):
    featured = django_filters.BooleanFilter(field_name="is_featured")
    client = django_filters.CharFilter(field_name="client__name", lookup_expr="iexact")
    location = django_filters.CharFilter(field_name="location", lookup_expr="icontains")

    class Meta:
        model = Project
        fields = (
            "featured",
            "client",
            "location",
        )
