from django.test import TestCase

from .models import Client


class ClientTests(TestCase):
    def test_client_string_representation(self):
        client = Client.objects.create(
            name="Example Client",
            logo="clients/logos/example.png",
            display_order=0,
        )

        self.assertEqual(str(client), "Example Client")
