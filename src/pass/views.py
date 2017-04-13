from django.shortcuts import render

# Create your views here.
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from lib.utils import AtomicMixin

from .models import Pass
from .serializers import PassSerializer


class PassListView(AtomicMixin, GenericAPIView):
    serializer_class = PassSerializer
    queryset = Pass.objects.all()

    def get(self, request):
        return Response({
            'pass': self.get_serializer(self.get_queryset(), many=True).data
        })
