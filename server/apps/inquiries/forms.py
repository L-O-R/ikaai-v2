from django import forms
from .models import Inquiry


class InquiryAdminForm(forms.ModelForm):
    class Meta:
        model = Inquiry
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(
                attrs={"placeholder": "e.g. Vikram Mehta"}
            ),
            "email": forms.EmailInput(
                attrs={"placeholder": "e.g. vikram@acmecorp.com"}
            ),
            "subject": forms.TextInput(
                attrs={"placeholder": "e.g. Inquiry regarding Healthcare Market Survey"}
            ),
            "message": forms.Textarea(
                attrs={
                    "rows": 4,
                    "placeholder": "Message content submitted by the user...",
                }
            ),
        }
        help_texts = {
            "name": "Full name of person submitting the inquiry.",
            "email": "Sender contact email address.",
            "subject": "Inquiry topic or subject title.",
            "message": "Full message text submitted from the public contact form.",
            "is_read": "Mark whether this inquiry has been reviewed by an admin.",
            "is_archived": "Archive this inquiry to hide it from active inbox views.",
        }
