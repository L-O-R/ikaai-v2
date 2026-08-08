from django import forms
from .models import Statistic


class StatisticAdminForm(forms.ModelForm):
    class Meta:
        model = Statistic
        fields = "__all__"
        widgets = {
            "title": forms.TextInput(
                attrs={"placeholder": "e.g. Impact Assessment Surveys Conducted"}
            ),
            "value": forms.NumberInput(
                attrs={"placeholder": "150"}
            ),
            "suffix": forms.TextInput(
                attrs={"placeholder": "e.g. + or % or K+"}
            ),
            "display_order": forms.NumberInput(
                attrs={"placeholder": "0"}
            ),
        }
        help_texts = {
            "title": "Descriptive title of the key organization statistic.",
            "value": "Numeric value to highlight (e.g. 150, 50, 1000).",
            "suffix": "Unit or symbol appended to the value (e.g. +, %, K+, Cr).",
            "display_order": "Sorting precedence order on the homepage metrics bar.",
            "is_active": "Toggle public visibility of this metric card.",
        }
