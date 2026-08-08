from django import forms
from unfold.widgets import UnfoldAdminDateWidget
from .models import Job, JobApplication


class JobAdminForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = "__all__"
        widgets = {
            "title": forms.TextInput(
                attrs={"placeholder": "e.g. Senior Market Research Analyst"}
            ),
            "slug": forms.TextInput(
                attrs={"placeholder": "e.g. senior-market-research-analyst"}
            ),
            "department": forms.TextInput(
                attrs={"placeholder": "e.g. Research & Advisory"}
            ),
            "location": forms.TextInput(
                attrs={"placeholder": "e.g. New Delhi, India (Hybrid)"}
            ),
            "salary": forms.TextInput(
                attrs={"placeholder": "e.g. ₹8,00,000 - ₹12,00,000 P.A."}
            ),
            "openings": forms.NumberInput(
                attrs={"placeholder": "1"}
            ),
            "description": forms.Textarea(
                attrs={
                    "rows": 4,
                    "placeholder": "Comprehensive overview of the role, team context, and objectives...",
                }
            ),
            "responsibilities": forms.Textarea(
                attrs={
                    "rows": 4,
                    "placeholder": "• Lead end-to-end quantitative and qualitative research projects\n• Design survey instruments and sampling frameworks...",
                }
            ),
            "requirements": forms.Textarea(
                attrs={
                    "rows": 4,
                    "placeholder": "• 3+ years of experience in market intelligence or management consulting\n• Strong proficiency in SPSS, R, Python, or Advanced Excel...",
                }
            ),
            "benefits": forms.Textarea(
                attrs={
                    "rows": 4,
                    "placeholder": "• Health insurance coverage\n• Flexible working hours and hybrid policy...",
                }
            ),
            "application_deadline": UnfoldAdminDateWidget(),
            "display_order": forms.NumberInput(
                attrs={"placeholder": "0"}
            ),
        }
        help_texts = {
            "title": "Official job title for the career opening.",
            "slug": "URL path slug. Auto-generated from title if blank.",
            "department": "Functional team or department (e.g. Consulting, Data Analytics, HR).",
            "location": "Primary work location or remote/hybrid designation.",
            "employment_type": "Classification: Full Time, Part Time, Contract, Internship, etc.",
            "experience_level": "Required experience band (e.g. 1–3 Years, 3–5 Years).",
            "salary": "Compensation range or competitive package details (optional).",
            "openings": "Number of open headcount positions.",
            "description": "General summary and background of the vacancy.",
            "responsibilities": "Key day-to-day duties and core deliverables.",
            "requirements": "Mandatory qualifications, skills, and experience required.",
            "benefits": "Perks, wellness plans, and workplace benefits.",
            "application_deadline": "Cutoff date for receiving candidate applications. Click calendar icon to select.",
            "featured": "Highlight this job opening on the careers hero banner.",
            "display_order": "Sorting precedence number.",
            "is_active": "Toggle public visibility of this job opening.",
        }


class JobApplicationAdminForm(forms.ModelForm):
    class Meta:
        model = JobApplication
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(
                attrs={"placeholder": "e.g. Rahul Sharma"}
            ),
            "email": forms.EmailInput(
                attrs={"placeholder": "e.g. rahul.sharma@example.com"}
            ),
            "phone": forms.TextInput(
                attrs={"placeholder": "e.g. +91 9876543210"}
            ),
            "current_company": forms.TextInput(
                attrs={"placeholder": "e.g. NielsenIQ"}
            ),
            "years_of_experience": forms.TextInput(
                attrs={"placeholder": "e.g. 3.5 Years"}
            ),
            "portfolio_url": forms.URLInput(
                attrs={"placeholder": "e.g. https://linkedin.com/in/rahulsharma"}
            ),
            "resume_drive_link": forms.URLInput(
                attrs={"placeholder": "e.g. https://drive.google.com/file/d/..."}
            ),
            "cover_letter": forms.Textarea(
                attrs={
                    "rows": 4,
                    "placeholder": "Candidate cover letter text...",
                }
            ),
            "notes": forms.Textarea(
                attrs={
                    "rows": 3,
                    "placeholder": "Internal recruiter notes, interview feedback, or screening comments...",
                }
            ),
        }
        help_texts = {
            "job": "Position applied for.",
            "name": "Candidate full name.",
            "email": "Primary contact email address.",
            "phone": "Contact phone number.",
            "current_company": "Current or most recent employer.",
            "years_of_experience": "Total professional work experience.",
            "portfolio_url": "Link to candidate LinkedIn profile, portfolio, or website.",
            "resume_drive_link": "Google Drive or Google Docs link to candidate resume.",
            "cover_letter": "Self-introduction or pitch submitted by candidate.",
            "status": "Recruitment pipeline status: New, Reviewed, Shortlisted, Rejected, Hired.",
            "notes": "Private internal notes and evaluator remarks for hiring managers.",
        }
