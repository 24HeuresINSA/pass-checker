from django.db import models
from django.utils.translation import ugettext as _


# Create your models here.
class AccessPoint(models.Model):
    name = models.CharField(max_length=256, verbose_name=_("Name"), unique=True)

    def __str__(self):
        return self.name


class TimeSlot(models.Model):
    name = models.CharField(max_length=256, verbose_name=_("Name"), unique=True)
    begins_at = models.DateTimeField(verbose_name=_("Start time"))
    ends_at = models.DateTimeField(verbose_name=_("End time"))

    def __str__(self):
        return self.name


class Driver(models.Model):
    first_name = models.CharField(max_length=256, verbose_name=_("First name"), null=True, blank=True)
    last_name = models.CharField(max_length=256, verbose_name=_("Last name"), null=True, blank=True)
    entity_name = models.CharField(max_length=256, verbose_name=_("Entity name"), null=True, blank=True)

    def __str__(self):
        return "[" + str(self.entity_name) + "] " + str(self.first_name) + " " + str(self.last_name)


class Vehicle(models.Model):
    numberplate = models.CharField(max_length=20, verbose_name=_("Numberplate"))

    def __str__(self):
        return self.numberplate


class Pass(models.Model):
    vehicle = models.ForeignKey(Vehicle, verbose_name=_("Vehicle"), related_name="passes", on_delete=models.CASCADE)
    allowed_drivers = models.ManyToManyField(Driver, verbose_name=_("Allowed drivers"), related_name="passes")
    allowed_access_points = models.ManyToManyField(AccessPoint, verbose_name=_("Allowed access points"),
                                                   related_name="passes")
    allowed_time_slots = models.ManyToManyField(TimeSlot, verbose_name=_("Allowed time slots"), related_name="passes")

    def __str__(self):
        return self.vehicle.numberplate
