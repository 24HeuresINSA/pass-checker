from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from .views import PassListView
urlpatterns = [
    url(_(r'^$'), PassListView.as_view(), name='list'),
]
