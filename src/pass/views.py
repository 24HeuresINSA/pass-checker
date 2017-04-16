from django.shortcuts import render

# Create your views here.
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response

from lib.utils import AtomicMixin

from .models import Pass, AccessPoint
from .serializers import PassSerializer, AccessPointSerializer


class PassListView(AtomicMixin, GenericAPIView):
    serializer_class = PassSerializer
    queryset = Pass.objects.all()

    def get(self, request):
        return Response({
            'pass': self.get_serializer(self.get_queryset(), many=True).data
        })


class AccessPointListView(AtomicMixin, ListAPIView):
    serializer_class = AccessPointSerializer
    queryset = AccessPoint.objects.all()
