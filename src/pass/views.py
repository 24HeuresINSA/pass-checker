import csv

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

# Create your views here.
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response

from lib.utils import AtomicMixin

from .models import Pass, AccessPoint, Access, TimeSlot
from .serializers import PassSerializer, AccessPointSerializer, AccessSerializer


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


@login_required
def export_pass_to_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="pass-export.csv"'

    passes = Pass.objects.all()\
        .prefetch_related('allowed_access_points') \
        .prefetch_related('allowed_drivers')\
        .prefetch_related('allowed_time_slots')
    access_points = AccessPoint.objects.all()
    time_slots = TimeSlot.objects.all()

    writer = csv.writer(response)

    header = ['id', 'drivers', 'numberplate']
    for access_point in access_points:
        header.append(access_point.name)
    for time_slot in time_slots:
        header.append(time_slot.name)
    writer.writerow(header)

    for p in passes:
        row = ['17' + str(p.id).zfill(3), ', '.join(p.get_drivers()), p.vehicle.numberplate]
        for a in access_points:
            if a in p.allowed_access_points.all():
                row.append('OUI')
            else:
                row.append('NON')
        for t in time_slots:
            if t in p.allowed_time_slots.all():
                row.append('OUI')
            else:
                row.append('NON')
        writer.writerow(row)

    return response
