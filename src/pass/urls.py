from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from .views import PassListView, AccessPointListView

urlpatterns = [
    url(_(r'^$'), PassListView.as_view(), name='list'),
    url(_(r'^access-points/$'), AccessPointListView.as_view(), name='access-point-list'),
]
