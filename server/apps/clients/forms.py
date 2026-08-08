from django import forms
from .models import Client


class ClientAdminForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(
                attrs={"placeholder": "e.g. Ministry of Women and Child Development"}
            ),
            "website": forms.URLInput(
                attrs={"placeholder": "e.g. https://wcd.nic.in"}
            ),
            "display_order": forms.NumberInput(
                attrs={"placeholder": "0"}
            ),
        }
        help_texts = {
            "name": "Official client organization name.",
            "section_logo": "Logo displayed in the homepage client section strip (PNG or SVG recommended).",
            "project_logo": "Logo displayed on project cards. Falls back to section logo if empty.",
            "client_section_image": "Optional section graphic for client feature blocks.",
            "project_image": "Optional project contextual image associated with client.",
            "website": "Client official website URL.",
            "display_order": "Sorting order precedence number.",
            "is_active": "Toggle public display on the clients showcase grid.",
        }
