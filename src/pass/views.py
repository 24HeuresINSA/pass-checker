from django.shortcuts import render

# Create your views here.
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response

from lib.utils import AtomicMixin

from .models import Pass, AccessPoint, Access
from .serializers import PassSerializer, AccessPointSerializer, AccessSerializer, AccessCommentSerializer


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


class AccessListView(AtomicMixin, ListAPIView):
    serializer_class = AccessSerializer
    queryset = Access.objects.all()


class AccessCreateView(AtomicMixin, CreateAPIView):
    serializer_class = AccessSerializer


class AccessDeleteView(AtomicMixin, DestroyAPIView):
    serializer_class = AccessSerializer
    queryset = Access.objects.all()


class AccessCommentUpdateView(AtomicMixin, UpdateAPIView):
    serializer_class = AccessSerializer
    queryset = Access.objects.all()
