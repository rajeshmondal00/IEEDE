# Generated by Django 5.1.2 on 2024-11-12 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_alter_educationprofile_registration_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educationprofile',
            name='qualifications',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
