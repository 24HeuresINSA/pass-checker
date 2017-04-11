# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccessPoint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('name', models.CharField(max_length=256, unique=True, verbose_name='Name')),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=256, null=True, verbose_name='First name')),
                ('last_name', models.CharField(blank=True, max_length=256, null=True, verbose_name='Last name')),
                ('entity_name', models.CharField(blank=True, max_length=256, null=True, verbose_name='Entity name')),
            ],
        ),
        migrations.CreateModel(
            name='Pass',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('allowed_access_points', models.ManyToManyField(to='pass.AccessPoint', related_name='passes', verbose_name='Allowed access points')),
                ('allowed_drivers', models.ManyToManyField(to='pass.Driver', related_name='passes', verbose_name='Allowed drivers')),
            ],
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('name', models.CharField(max_length=256, unique=True, verbose_name='Name')),
                ('begins_at', models.DateTimeField(verbose_name='Start time')),
                ('ends_at', models.DateTimeField(verbose_name='End time')),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('numberplate', models.CharField(max_length=20, verbose_name='Numberplate')),
            ],
        ),
        migrations.AddField(
            model_name='pass',
            name='allowed_time_slots',
            field=models.ManyToManyField(to='pass.TimeSlot', related_name='passes', verbose_name='Allowed time slots'),
        ),
        migrations.AddField(
            model_name='pass',
            name='vehicle',
            field=models.ForeignKey(to='pass.Vehicle', verbose_name='Vehicle', related_name='passes'),
        ),
    ]
