from django.urls import path

from .views import StatisticListAPIView

app_name = "statistics"

urlpatterns = [
    path("", StatisticListAPIView.as_view(), name="statistics_list"),
]
