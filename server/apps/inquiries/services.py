from django.conf import settings
from django.utils import timezone

from common.mail import send_notification_email

from .models import Inquiry


class InquiryService:
    """Business logic for inquiry creation and notification delivery."""

    @staticmethod
    def create_inquiry(validated_data: dict) -> Inquiry:
        inquiry = Inquiry.objects.create(**validated_data)
        InquiryService.send_notification(inquiry)
        return inquiry

    @staticmethod
    def send_notification(inquiry: Inquiry) -> bool:
        recipient = getattr(settings, "CONTACT_NOTIFICATION_EMAIL", "")
        submitted_at = timezone.localtime(inquiry.created_at).strftime("%B %d, %Y at %I:%M %p")
        body = (
            f"Name: {inquiry.name}\n"
            f"Email: {inquiry.email}\n"
            f"Subject: {inquiry.subject}\n"
            f"Message:\n{inquiry.message}\n\n"
            f"Submitted Time: {submitted_at}"
        )
        return send_notification_email(
            subject="New Website Inquiry",
            body=body,
            recipients=[recipient] if recipient else [],
        )
