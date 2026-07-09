from unittest.mock import patch

from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .models import Inquiry
from .selectors import (
    get_archived_inquiries,
    get_inquiries,
    get_recent_inquiries,
    get_unread_inquiries,
)
from .serializers import InquiryCreateSerializer
from .services import InquiryService


class InquiryTests(TestCase):
    def test_serializer_validates_required_fields(self):
        serializer = InquiryCreateSerializer(data={})

        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)
        self.assertIn("email", serializer.errors)
        self.assertIn("subject", serializer.errors)
        self.assertIn("message", serializer.errors)

    @override_settings(CONTACT_NOTIFICATION_EMAIL="notifications@localhost")
    @patch("apps.inquiries.services.send_notification_email", return_value=True)
    def test_service_creates_inquiry_and_sends_notification(self, mocked_send):
        inquiry = InquiryService.create_inquiry(
            {
                "name": "Aarav",
                "email": "aarav@example.com",
                "subject": "Partnership",
                "message": "We would like to connect.",
            }
        )

        self.assertEqual(Inquiry.objects.count(), 1)
        self.assertEqual(inquiry.name, "Aarav")
        mocked_send.assert_called_once()

    def test_selectors_return_expected_sets(self):
        unread = Inquiry.objects.create(
            name="Unread",
            email="unread@example.com",
            subject="Hello",
            message="Message",
        )
        archived = Inquiry.objects.create(
            name="Archived",
            email="archived@example.com",
            subject="Archive",
            message="Message",
            is_archived=True,
        )
        read = Inquiry.objects.create(
            name="Read",
            email="read@example.com",
            subject="Read",
            message="Message",
            is_read=True,
        )

        self.assertIn(unread, list(get_inquiries()))
        self.assertIn(unread, list(get_unread_inquiries()))
        self.assertIn(archived, list(get_archived_inquiries()))
        self.assertEqual(len(list(get_recent_inquiries())), 3)
        self.assertNotIn(read, list(get_unread_inquiries()))

    @override_settings(CONTACT_NOTIFICATION_EMAIL="notifications@localhost")
    def test_public_api_creates_inquiry(self):
        client = APIClient()

        response = client.post(
            "/api/v1/inquiries/",
            {
                "name": "Aarav",
                "email": "aarav@example.com",
                "subject": "General enquiry",
                "message": "Please contact me.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["success"], True)
        self.assertEqual(Inquiry.objects.count(), 1)

    def test_public_api_does_not_expose_get(self):
        client = APIClient()

        response = client.get("/api/v1/inquiries/")

        self.assertEqual(response.status_code, 405)
