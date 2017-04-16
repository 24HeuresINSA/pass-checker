# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-16 19:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pass', '0002_entry'),
    ]

    operations = [
        migrations.CreateModel(
            name='Access',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.SmallIntegerField(choices=[(1, 'Passage'), (2, 'Forçage')], verbose_name='Access type')),
                ('numberplate', models.CharField(max_length=256, verbose_name='Numberplate')),
                ('access_point', models.CharField(max_length=256, verbose_name='Access point')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Comment')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
            ],
        ),
        migrations.DeleteModel(
            name='Entry',
        ),
    ]
