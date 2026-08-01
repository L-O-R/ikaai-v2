# Generated manually for Projects refactor

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='cover_image',
            new_name='featured_image',
        ),
        migrations.AlterField(
            model_name='project',
            name='featured_image',
            field=models.ImageField(upload_to='projects/featured/'),
        ),
        migrations.RenameField(
            model_name='project',
            old_name='description',
            new_name='introduction',
        ),
        migrations.RemoveField(
            model_name='project',
            name='location',
        ),
        migrations.AddField(
            model_name='project',
            name='start_year',
            field=models.PositiveSmallIntegerField(default=2025),
        ),
        migrations.AddField(
            model_name='project',
            name='end_year',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='coverage',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='industry',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='project',
            name='scope_of_work',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='sample_size',
            field=models.TextField(blank=True),
        ),
        migrations.DeleteModel(
            name='ProjectImage',
        ),
    ]
