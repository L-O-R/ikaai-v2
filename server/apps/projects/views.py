from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

from .filters import ProjectFilter
from .selectors import get_project_by_slug, get_projects
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 48


class ProjectListAPIView(ListAPIView):
    """Read-only public project listing."""

    serializer_class = ProjectListSerializer
    permission_classes = (AllowAny,)
    pagination_class = ProjectPagination
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filterset_class = ProjectFilter
    search_fields = ("title", "client__name", "location")
    ordering_fields = ("created_at", "display_order", "title")
    ordering = ("display_order", "title")

    def get_queryset(self):
        return get_projects()


class ProjectDetailAPIView(RetrieveAPIView):
    """Read-only public project detail endpoint."""

    serializer_class = ProjectDetailSerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"

    def get_queryset(self):
        return get_projects()


