import shutil
import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient

from .models import Update
from .selectors import get_active_updates


def tiny_gif(name: str) -> SimpleUploadedFile:
    return SimpleUploadedFile(
        name,
        (
            b"GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00"
            b"\xff\xff\xff,\x00\x00\x00\x00\x01\x00\x01\x00"
            b"\x00\x02\x02D\x01\x00;"
        ),
        content_type="image/gif",
    )


TEMP_MEDIA_ROOT = tempfile.mkdtemp()


def tearDownModule():
    shutil.rmtree(TEMP_MEDIA_ROOT, ignore_errors=True)


@override_settings(MEDIA_ROOT=TEMP_MEDIA_ROOT)
class UpdateSelectorTests(TestCase):
    def test_get_active_updates_returns_active_ordered_updates(self):
        older = timezone.now() - timezone.timedelta(days=1)
        newer = timezone.now()

        first = Update.objects.create(
            title="First",
            image=tiny_gif("first.gif"),
            link="https://example.com/first",
            display_order=1,
            published_at=older,
        )
        latest = Update.objects.create(
            title="Latest",
            image=tiny_gif("latest.gif"),
            link="https://example.com/latest",
            display_order=2,
            published_at=newer,
        )
        second = Update.objects.create(
            title="Second",
            image=tiny_gif("second.gif"),
            link="https://example.com/second",
            display_order=2,
            published_at=older,
        )
        Update.objects.create(
            title="Inactive",
            image=tiny_gif("inactive.gif"),
            link="https://example.com/inactive",
            display_order=0,
            is_active=False,
        )

        self.assertEqual(list(get_active_updates()), [first, latest, second])


@override_settings(MEDIA_ROOT=TEMP_MEDIA_ROOT)
class UpdateAPITests(TestCase):
    def test_update_list_is_read_only_and_public(self):
        Update.objects.create(
            title="Public update",
            image=tiny_gif("public.gif"),
            link="https://example.com/public",
        )

        client = APIClient()
        url = reverse("updates:update-list")

        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(set(response.data[0].keys()), {"title", "image", "link"})

        post_response = client.post(url, {})
        self.assertEqual(post_response.status_code, 405)
