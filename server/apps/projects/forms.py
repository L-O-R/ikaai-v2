from django import forms
from .models import Project, OtherProject, ProjectStat


class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = "__all__"
        widgets = {
            "title": forms.TextInput(
                attrs={
                    "placeholder": "e.g. AI-Powered Market Intelligence Platform",
                }
            ),
            "slug": forms.TextInput(
                attrs={
                    "placeholder": "e.g. ai-powered-market-intelligence-platform (auto-generated if blank)",
                }
            ),
            "introduction": forms.Textarea(
                attrs={
                    "rows": 3,
                    "placeholder": "Provide a brief summary of the project scope and client background...",
                }
            ),
            "coverage": forms.Textarea(
                attrs={
                    "rows": 3,
                    "placeholder": "e.g. Pan-India coverage across 14 Tier-1 & Tier-2 cities...",
                }
            ),
            "industry": forms.TextInput(
                attrs={
                    "placeholder": "e.g. Healthcare & Medical Technology",
                }
            ),
            "scope_of_work": forms.Textarea(
                attrs={
                    "rows": 3,
                    "placeholder": "e.g. Comprehensive primary research, stakeholder interviews, market sizing...",
                }
            ),
            "sample_size": forms.TextInput(
                attrs={
                    "placeholder": "e.g. 5,000+ Respondents across 8 States",
                }
            ),
            "display_order": forms.NumberInput(
                attrs={
                    "placeholder": "0",
                }
            ),
        }
        help_texts = {
            "title": "Primary title of the project as displayed on public case studies.",
            "slug": "URL-friendly identifier. Auto-generated from title if left blank.",
            "featured_image": "High-resolution banner or hero thumbnail image for this project.",
            "client": "Associated client organization for this project.",
            "introduction": "Overview summary shown on the project detail view.",
            "coverage": "Geographic regions, locations, or operational scope covered.",
            "industry": "Industry sector or vertical classification.",
            "scope_of_work": "Key deliverables, methodology, and operational responsibilities.",
            "sample_size": "Survey sample size, dataset size, or key metric baseline.",
            "is_featured": "Pin this project to the featured showcase section on the homepage.",
            "display_order": "Numerical priority for sorting. Lower numbers appear first.",
            "is_active": "Toggle public visibility of this project on the website.",
        }


class ProjectStatInlineForm(forms.ModelForm):
    class Meta:
        model = ProjectStat
        fields = "__all__"
        widgets = {
            "title": forms.TextInput(
                attrs={"placeholder": "e.g. Total Revenue Growth"}
            ),
            "value": forms.TextInput(
                attrs={"placeholder": "e.g. +145%"}
            ),
            "material_symbol": forms.TextInput(
                attrs={"placeholder": "e.g. trending_up"}
            ),
            "display_order": forms.NumberInput(
                attrs={"placeholder": "0"}
            ),
        }
        help_texts = {
            "title": "Short title for the metric or key highlight.",
            "value": "Numeric value or percentage to highlight.",
            "material_symbol": "Google Material Symbols icon name (e.g. bar_chart, group, trending_up).",
            "display_order": "Display sequence order.",
            "is_active": "Toggle visibility of this statistic card.",
        }


class OtherProjectAdminForm(forms.ModelForm):
    class Meta:
        model = OtherProject
        fields = "__all__"
        labels = {
            "section": "Sector",
        }
        widgets = {
            "title": forms.TextInput(
                attrs={"placeholder": "e.g. Renewable Energy Adoption Survey"}
            ),
            "section": forms.TextInput(
                attrs={"placeholder": "e.g. ESG & Sustainability"}
            ),
            "description": forms.Textarea(
                attrs={
                    "rows": 3,
                    "placeholder": "Brief summary of key objectives and findings...",
                }
            ),
        }
        help_texts = {
            "title": "Project title.",
            "section": "Category or department section grouping.",
            "description": "Short explanatory narrative.",
            "is_active": "Toggle public display of this project.",
        }
