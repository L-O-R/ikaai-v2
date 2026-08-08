from django import forms
from django.contrib.auth import get_user_model
from unfold.widgets import UnfoldAdminSplitDateTimeWidget

from .models import Blog, BlogCategory


class BlogCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = BlogCategory
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(
                attrs={"placeholder": "e.g. Industry Research & Analytics"}
            ),
            "slug": forms.TextInput(
                attrs={"placeholder": "e.g. industry-research-analytics"}
            ),
            "description": forms.TextInput(
                attrs={"placeholder": "e.g. Articles and market intelligence reports..."}
            ),
            "display_order": forms.NumberInput(
                attrs={"placeholder": "0"}
            ),
        }
        help_texts = {
            "name": "Unique name for the blog category.",
            "slug": "URL slug. Auto-generated from name if left blank.",
            "description": "Short explanation of topics covered in this category.",
            "display_order": "Sorting priority. Lower numbers appear first.",
            "is_active": "Toggle category visibility on public blog pages.",
        }


class BlogAdminForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = "__all__"
        labels = {
            "excerpt": "Short Description",
        }
        widgets = {
            "title": forms.TextInput(
                attrs={
                    "placeholder": "e.g. The Future of AI in Market Research 2026",
                }
            ),
            "slug": forms.TextInput(
                attrs={
                    "placeholder": "e.g. future-of-ai-in-market-research-2026",
                }
            ),
            "excerpt": forms.TextInput(
                attrs={
                    "placeholder": "e.g. An in-depth analysis of emerging AI methodologies transforming primary data collection...",
                }
            ),
            "content": forms.Textarea(
                attrs={
                    "class": "markdown-editor",
                    "rows": 20,
                    "placeholder": "Write your post in Markdown format here...",
                }
            ),
            "published_at": UnfoldAdminSplitDateTimeWidget(),
            "meta_title": forms.TextInput(
                attrs={
                    "placeholder": "e.g. The Future of AI in Market Research | IKAAI Insights",
                }
            ),
            "meta_description": forms.TextInput(
                attrs={
                    "placeholder": "e.g. Explore how artificial intelligence and LLMs are reshaping data collection, analytics, and strategy in 2026.",
                }
            ),
            "canonical_url": forms.URLInput(
                attrs={
                    "placeholder": "https://ikaai.com/blogs/future-of-ai-in-market-research-2026",
                }
            ),
            "display_order": forms.NumberInput(
                attrs={
                    "placeholder": "0",
                }
            ),
        }
        help_texts = {
            "title": "Main title of the blog post.",
            "slug": "SEO-friendly URL path slug. Auto-generated from title if left blank.",
            "excerpt": "Short 1-2 sentence preview text displayed on blog listing cards.",
            "featured_image": "Hero banner image for the article page and social previews.",
            "content": "Main post content. Full Markdown formatting is supported.",
            "category": "Primary category for filtering and indexing.",
            "author": "Staff member or author attributed to this publication.",
            "status": "Publication status: Draft (hidden) or Published (visible).",
            "published_at": "Publication date and time. Click calendar and clock icons to select.",
            "featured": "Promote this post to the featured hero banner on the blog home.",
            "display_order": "Sorting precedence number.",
            "is_active": "Toggle public visibility.",
            "meta_title": "Custom title tag for search engine indexing (recommended 50-60 characters).",
            "meta_description": "Meta description for search engine result snippets (recommended 140-160 characters).",
            "og_image": "Custom Open Graph image for social sharing on LinkedIn/X/Facebook.",
            "canonical_url": "Preferred canonical URL if cross-posting or syndicating.",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        user_model = get_user_model()
        self.fields["author"].queryset = user_model.objects.filter(
            is_staff=True,
            is_active=True,
        ).order_by("first_name", "last_name", "email")
