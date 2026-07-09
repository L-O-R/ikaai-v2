from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import InquiryCreateSerializer
from .services import InquiryService


class InquiryCreateAPIView(APIView):
    """Write-only public inquiry endpoint."""

    permission_classes = (AllowAny,)
    serializer_class = InquiryCreateSerializer
    http_method_names = ("post",)

    def post(self, request, *args, **kwargs):
        serializer = InquiryCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        InquiryService.create_inquiry(serializer.validated_data)
        return Response(
            {
                "success": True,
                "message": "Your inquiry has been submitted successfully.",
            },
            status=status.HTTP_201_CREATED,
        )
