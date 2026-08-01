from django.core.exceptions import ValidationError
from django.test import TestCase

from apps.clients.models import Client

from .models import Project
from .selectors import get_project_by_slug, get_projects, get_projects_by_client
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectTests(TestCase):
    def setUp(self):
        self.client = Client.objects.create(
            name="Example Client",
            logo="clients/logos/example.png",
            display_order=0,
        )

    def test_slug_is_generated_once(self):
        project = Project.objects.create(
            title="Annual Impact Report",
            featured_image="projects/featured/report.png",
            client=self.client,
            start_year=2025,
        )
        original_slug = project.slug

        project.title = "Updated title"
        project.save()

        self.assertEqual(project.slug, original_slug)

    def test_featured_project_limit_validation(self):
        for index in range(4):
            Project.objects.create(
                title=f"Featured {index}",
                featured_image=f"projects/featured/{index}.png",
                client=self.client,
                is_featured=True,
                display_order=index,
                start_year=2025,
            )

        project = Project(
            title="Fifth featured",
            featured_image="projects/featured/fifth.png",
            client=self.client,
            is_featured=True,
            start_year=2025,
        )

        with self.assertRaises(ValidationError):
            project.full_clean()

    def test_selectors_return_active_projects(self):
        active = Project.objects.create(
            title="Active project",
            featured_image="projects/featured/active.png",
            client=self.client,
            display_order=1,
            start_year=2025,
        )
        inactive = Project.objects.create(
            title="Inactive project",
            featured_image="projects/featured/inactive.png",
            client=self.client,
            is_active=False,
            display_order=0,
            start_year=2025,
        )

        self.assertEqual(list(get_projects()), [active])
        self.assertEqual(get_project_by_slug(active.slug), active)
        self.assertEqual(list(get_projects_by_client("Example Client")), [active])
        self.assertNotIn(inactive, list(get_projects()))

    def test_serializers_expose_public_fields_only(self):
        project = Project.objects.create(
            title="Serializer project",
            featured_image="projects/featured/serializer.png",
            client=self.client,
            introduction="This is a long introduction.",
            start_year=2025,
        )

        list_serializer = ProjectListSerializer(project)
        detail_serializer = ProjectDetailSerializer(project)

        self.assertEqual(
            set(list_serializer.fields),
            {
                "slug",
                "title",
                "featured_image",
                "client",
                "introduction",
                "start_year",
                "end_year",
                "coverage",
                "industry",
                "scope_of_work",
                "sample_size",
            },
        )
        self.assertIn("statistics", detail_serializer.fields)
