import django_filters

from .models import Blog


class BlogFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category__slug", lookup_expr="iexact")
    featured = django_filters.BooleanFilter(field_name="featured")
    latest = django_filters.BooleanFilter(method="filter_latest")

    class Meta:
        model = Blog
        fields = (
            "category",
            "featured",
            "latest",
        )

    def filter_latest(self, queryset, name, value):
        if value:
            return queryset.order_by("-published_at", "-created_at")
        return queryset
