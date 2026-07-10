import shutil
import tempfile

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient

from .models import Blog, BlogCategory, BlogStatus
from .selectors import get_blogs, get_related_blogs
from .services import calculate_reading_time

TEMP_MEDIA_ROOT = tempfile.mkdtemp()


def tearDownModule():
    shutil.rmtree(TEMP_MEDIA_ROOT, ignore_errors=True)


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


@override_settings(MEDIA_ROOT=TEMP_MEDIA_ROOT)
class BlogTests(TestCase):
    def setUp(self):
        self.category = BlogCategory.objects.create(name="Insights")
        self.author = get_user_model().objects.create_user(
            email="editor@example.com",
            first_name="Editor",
            is_staff=True,
        )

    def create_blog(self, **overrides):
        data = {
            "title": "Useful Insight",
            "excerpt": "A short summary.",
            "featured_image": tiny_gif("blog.gif"),
            "content": "# Heading\n\nThis is useful Markdown content.",
            "category": self.category,
            "author": self.author,
            "status": BlogStatus.PUBLISHED,
        }
        data.update(overrides)
        return Blog.objects.create(**data)

    def test_blog_generates_slug_and_reading_time(self):
        blog = self.create_blog()

        self.assertEqual(blog.slug, "useful-insight")
        self.assertEqual(blog.reading_time, 1)
        self.assertIsNotNone(blog.published_at)

    def test_only_published_blogs_are_public(self):
        published = self.create_blog(title="Published")
        self.create_blog(title="Draft", status=BlogStatus.DRAFT, published_at=None)

        self.assertEqual(list(get_blogs()), [published])

    def test_related_blogs_use_same_category(self):
        current = self.create_blog(title="Current")
        related = self.create_blog(title="Related")
        other_category = BlogCategory.objects.create(name="Research")
        self.create_blog(title="Other", category=other_category)

        self.assertEqual(list(get_related_blogs(current)), [related])

    def test_public_api_is_read_only_and_hides_content_in_listing(self):
        blog = self.create_blog()
        client = APIClient()

        list_response = client.get(reverse("blogs:blog-list"))
        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(list_response.data["count"], 1)
        self.assertNotIn("content", list_response.data["results"][0])

        detail_response = client.get(reverse("blogs:blog-detail", args=[blog.slug]))
        self.assertEqual(detail_response.status_code, 200)
        self.assertIn("content", detail_response.data)
        self.assertIn("related_blogs", detail_response.data)

        post_response = client.post(reverse("blogs:blog-list"), {})
        self.assertEqual(post_response.status_code, 405)

    def test_calculate_reading_time_strips_markdown(self):
        words = " ".join(["word"] * 201)
        self.assertEqual(calculate_reading_time(f"# Title\n\n**{words}**"), 2)
