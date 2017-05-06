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
    comment = models.TextField(verbose_name="Comment", null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, verbose_name=_("Vehicle"), related_name="passes", on_delete=models.CASCADE)
    allowed_drivers = models.ManyToManyField(Driver, verbose_name=_("Allowed drivers"), related_name="passes")
    allowed_access_points = models.ManyToManyField(AccessPoint, verbose_name=_("Allowed access points"),
                                                   related_name="passes")
    allowed_time_slots = models.ManyToManyField(TimeSlot, verbose_name=_("Allowed time slots"), related_name="passes")

    def __str__(self):
        return self.vehicle.numberplate

    def get_drivers(self):
        drivers = []
        for d in self.allowed_drivers.all():
            driver = ''
            if d.first_name is not None:
                driver = d.first_name
            if d.last_name is not None:
                driver = driver + ' ' + d.last_name
            if d.entity_name is not None:
                driver = driver + ' (' + d.entity_name + ')'
            drivers.append(driver)
        return drivers


class Access(models.Model):
    PASSING_ACCESS = 1
    FORCE_ACCESS = 2
    ACCESS_TYPES = (
        (PASSING_ACCESS, _("Passage")),
        (FORCE_ACCESS, _("Forçage"))
    )
    ACTION_SENTENCES = (
        (PASSING_ACCESS, _("est autorisé à passer")),
        (FORCE_ACCESS, _("a forcé le point d'accès"))
    )

    type = models.SmallIntegerField(verbose_name=_("Access type"), choices=ACCESS_TYPES)
    numberplate = models.CharField(verbose_name=_("Numberplate"), max_length=256)
    access_point = models.CharField(verbose_name=_("Access point"), max_length=256)
    comment = models.TextField(verbose_name=_("Comment"), null=True, blank=True)

    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)

    class Meta(object):
        ordering = ['-created_at']

    def __str__(self):
        return self.numberplate + " on " + str(self.created_at)
