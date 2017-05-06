#!/usr/bin/env bash

until cd src
do
    echo "Waiting for django volume..."
done

until python manage.py migrate --settings=djangoreactredux.settings.prod
do
    echo "Waiting for postgres ready..."
    sleep 2
done

/etc/init.d/nginx start
gunicorn --bind=0.0.0.0:8000 --workers=3 --env DJANGO_SETTINGS_MODULE=djangoreactredux.settings.prod djangoreactredux.wsgi