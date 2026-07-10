from django import forms
from django.contrib.auth import get_user_model

from .models import Blog


class BlogAdminForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = "__all__"
        widgets = {
            "content": forms.Textarea(
                attrs={
                    "class": "markdown-editor",
                    "rows": 24,
                }
            )
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        user_model = get_user_model()
        self.fields["author"].queryset = user_model.objects.filter(
            is_staff=True,
            is_active=True,
        ).order_by("first_name", "last_name", "email")
