from django.urls import path

from .views import BlogDetailAPIView, BlogListAPIView

app_name = "blogs"

urlpatterns = [
    path("", BlogListAPIView.as_view(), name="blog-list"),
    path("<slug:slug>/", BlogDetailAPIView.as_view(), name="blog-detail"),
]
