FROM python:3.4.6
MAINTAINER Léo Martinez <leo84.martinez@gmail.com>

ENV PYTHONUNBUFFERED 1

WORKDIR /django

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y nodejs yarn nginx

COPY ./docker/prod/django-entrypoint.sh /django-entrypoint.sh
COPY ./py-requirements /django/py-requirements

RUN pip install pip==9.0.1
RUN pip install -r py-requirements/prod.txt

COPY ./src /django/src
COPY ./webpack /django/webpack
COPY ./package.json /django/package.json
COPY ./.babelrc /django/.babelrc
COPY ./docker/prod/nginx-default /etc/nginx/sites-enabled/default

RUN yarn
RUN npm run prod

EXPOSE 80
CMD ["/django-entrypoint.sh"]