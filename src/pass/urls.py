from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from .views import PassListView, AccessPointListView, AccessCreateView, AccessListView, AccessCommentUpdateView, \
    AccessDeleteView, export_pass_to_csv

urlpatterns = [
    url(_(r'^$'), PassListView.as_view(), name='list'),
    url(_(r'^access-points/$'), AccessPointListView.as_view(), name='access-point-list'),
    url(_(r'^accesses/$'), AccessListView.as_view(), name='access-list'),
    url(_(r'^accesses/create/$'), AccessCreateView.as_view(), name='access-create'),
    url(_(r'^accesses/(?P<pk>\d+)/comment/$'), AccessCommentUpdateView.as_view(), name='access-comment-update'),
    url(_(r'^accesses/(?P<pk>\d+)/$'), AccessDeleteView.as_view(), name='access-delete'),
    url(_(r'^export/$'), export_pass_to_csv, name='pass-export')
]
