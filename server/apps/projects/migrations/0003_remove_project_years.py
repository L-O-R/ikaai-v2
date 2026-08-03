from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0002_refactor_project_model"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="start_year",
        ),
        migrations.RemoveField(
            model_name="project",
            name="end_year",
        ),
    ]
