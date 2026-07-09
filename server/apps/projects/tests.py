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
            cover_image="projects/cover/report.png",
            client=self.client,
        )
        original_slug = project.slug

        project.title = "Updated title"
        project.save()

        self.assertEqual(project.slug, original_slug)

    def test_featured_project_limit_validation(self):
        for index in range(4):
            Project.objects.create(
                title=f"Featured {index}",
                cover_image=f"projects/cover/{index}.png",
                client=self.client,
                is_featured=True,
                display_order=index,
            )

        project = Project(
            title="Fifth featured",
            cover_image="projects/cover/fifth.png",
            client=self.client,
            is_featured=True,
        )

        with self.assertRaises(ValidationError):
            project.full_clean()

    def test_selectors_return_active_projects(self):
        active = Project.objects.create(
            title="Active project",
            cover_image="projects/cover/active.png",
            client=self.client,
            display_order=1,
        )
        inactive = Project.objects.create(
            title="Inactive project",
            cover_image="projects/cover/inactive.png",
            client=self.client,
            is_active=False,
            display_order=0,
        )

        self.assertEqual(list(get_projects()), [active])
        self.assertEqual(get_project_by_slug(active.slug), active)
        self.assertEqual(list(get_projects_by_client("Example Client")), [active])
        self.assertNotIn(inactive, list(get_projects()))

    def test_serializers_expose_public_fields_only(self):
        project = Project.objects.create(
            title="Serializer project",
            cover_image="projects/cover/serializer.png",
            client=self.client,
            description="This is a long description for truncation testing.",
            location="Delhi",
        )

        list_serializer = ProjectListSerializer(project)
        detail_serializer = ProjectDetailSerializer(project)

        self.assertEqual(
            set(list_serializer.fields),
            {
                "slug",
                "title",
                "cover_image",
                "client",
                "client_logo",
                "location",
                "featured",
                "short_description",
            },
        )
        self.assertIn("description", detail_serializer.fields)
