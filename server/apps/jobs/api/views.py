from django.http import Http404
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ..filters import JobFilter
from ..selectors import get_active_jobs, get_job_detail
from ..serializers import JobDetailSerializer, JobListSerializer
from ..services import JobApplicationService
from .serializers import JobApplicationCreateSerializer


class JobPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


class JobListAPIView(ListAPIView):
    serializer_class = JobListSerializer
    permission_classes = (AllowAny,)
    pagination_class = JobPagination
    filterset_class = JobFilter
    search_fields = ("title", "location", "department")
    ordering_fields = ("display_order", "title", "created_at")
    ordering = ("display_order", "title")

    def get_queryset(self):
        return get_active_jobs()


class JobDetailAPIView(RetrieveAPIView):
    serializer_class = JobDetailSerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"

    def get_queryset(self):
        return get_active_jobs()

    def get_object(self):
        try:
            return get_job_detail(self.kwargs["slug"])
        except Exception as exc:
            raise Http404 from exc


class JobApplicationCreateAPIView(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ("post",)

    def post(self, request, *args, **kwargs):
        serializer = JobApplicationCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        JobApplicationService.create_application(serializer.validated_data)
        return Response(
            {"success": True, "message": "Application submitted successfully."},
            status=status.HTTP_201_CREATED,
        )
