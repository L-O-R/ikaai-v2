import django_filters
from django.db.models import Q

from .models import Job


class JobFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search", label="Search")
    department = django_filters.CharFilter(field_name="department", lookup_expr="icontains")
    employment_type = django_filters.CharFilter(field_name="employment_type", lookup_expr="exact")
    featured = django_filters.BooleanFilter(field_name="featured")
    location = django_filters.CharFilter(field_name="location", lookup_expr="icontains")

    class Meta:
        model = Job
        fields = ["search", "department", "employment_type", "featured", "location"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value)
            | Q(location__icontains=value)
            | Q(department__icontains=value)
        )
