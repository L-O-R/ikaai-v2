from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import Statistic
from .selectors import get_active_statistics
from .serializers import StatisticSerializer


class StatisticTests(TestCase):
    def test_selector_returns_active_ordered_max_four(self):
        for index in range(5):
            Statistic.objects.create(
                title=f"Active statistic {index}",
                value=index + 1,
                display_order=5 - index,
                is_active=True,
            )
        Statistic.objects.create(
            title="Inactive statistic",
            value=99,
            display_order=0,
            is_active=False,
        )

        statistics = list(get_active_statistics())

        self.assertEqual(len(statistics), 4)
        self.assertEqual(
            [statistic.display_order for statistic in statistics],
            [1, 2, 3, 4],
        )
        self.assertTrue(all(statistic.is_active for statistic in statistics))

    def test_active_statistics_limit_validation(self):
        for index in range(4):
            Statistic.objects.create(
                title=f"Active statistic {index}",
                value=index + 1,
                display_order=index,
                is_active=True,
            )

        statistic = Statistic(
            title="Fifth statistic",
            value=5,
            display_order=5,
            is_active=True,
        )

        with self.assertRaises(ValidationError):
            statistic.full_clean()

    def test_serializer_exposes_public_fields_only(self):
        serializer = StatisticSerializer()

        self.assertEqual(
            set(serializer.fields),
            {
                "title",
                "value",
                "suffix",
            },
        )
