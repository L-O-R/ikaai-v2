# Handwritten migration: renames logo -> section_logo (preserving data) and adds project_logo.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0003_client_client_section_image_client_project_image'),
    ]

    operations = [
        # Rename logo -> section_logo so existing uploaded files are preserved.
        migrations.RenameField(
            model_name='client',
            old_name='logo',
            new_name='section_logo',
        ),
        # Make section_logo optional (it was required before).
        migrations.AlterField(
            model_name='client',
            name='section_logo',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='clients/logos/',
                help_text='Logo displayed in the homepage client section strip.',
            ),
        ),
        # Add the new project_logo field (optional).
        migrations.AddField(
            model_name='client',
            name='project_logo',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='clients/project-logos/',
                help_text='Logo displayed on project cards. Falls back to section_logo if empty.',
            ),
        ),
    ]
