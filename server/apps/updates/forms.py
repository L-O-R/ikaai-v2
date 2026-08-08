from django import forms
from unfold.widgets import UnfoldAdminSplitDateTimeWidget
from .models import Update


class UpdateAdminForm(forms.ModelForm):
    class Meta:
        model = Update
        fields = "__all__"
        widgets = {
            "title": forms.TextInput(
                attrs={"placeholder": "e.g. IKAAI India Partners with NITI Aayog for Aspirational Districts Evaluation"}
            ),
            "link": forms.URLInput(
                attrs={"placeholder": "e.g. https://example.com/news/aspirational-districts"}
            ),
            "published_at": UnfoldAdminSplitDateTimeWidget(),
            "display_order": forms.NumberInput(
                attrs={"placeholder": "0"}
            ),
        }
        help_texts = {
            "title": "Headline or title of the public announcement/update.",
            "image": "Feature image graphic for the news ticker/card.",
            "link": "Target destination URL when users click on this update.",
            "published_at": "Publication date and time. Click calendar and clock icons to select.",
            "display_order": "Sorting precedence number.",
            "is_active": "Toggle public visibility of this update on the website.",
        }
