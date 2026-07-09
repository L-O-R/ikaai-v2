from django.urls import path

from .views import InquiryCreateAPIView

app_name = "inquiries"

urlpatterns = [
    path("", InquiryCreateAPIView.as_view(), name="inquiry-create"),
]
