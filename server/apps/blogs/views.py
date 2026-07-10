from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from .filters import BlogFilter
from .selectors import get_blogs
from .serializers import BlogDetailSerializer, BlogListSerializer


class BlogPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = "page_size"
    max_page_size = 36


class BlogListAPIView(ListAPIView):
    """Read-only public blog listing."""

    serializer_class = BlogListSerializer
    permission_classes = (AllowAny,)
    pagination_class = BlogPagination
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filterset_class = BlogFilter
    search_fields = ("title", "excerpt", "category__name", "author__email")
    ordering_fields = ("published_at", "display_order", "title", "reading_time")
    ordering = ("display_order", "-published_at")

    def get_queryset(self):
        return get_blogs()


class BlogDetailAPIView(RetrieveAPIView):
    """Read-only public blog detail endpoint."""

    serializer_class = BlogDetailSerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"

    def get_queryset(self):
        return get_blogs()
