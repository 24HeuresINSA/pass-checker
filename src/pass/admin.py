from django.contrib import admin

from .models import AccessPoint, TimeSlot, Driver, Vehicle, Pass


# Register your models here.
class PassAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'drivers', 'time_slots', 'PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'PS6',)
    list_filter = ('allowed_access_points', 'allowed_time_slots',)

    def PS1(self, obj):
        return "PS1" in (o.name for o in obj.allowed_access_points.all())

    def PS2(self, obj):
        return "PS2" in (o.name for o in obj.allowed_access_points.all())

    def PS3(self, obj):
        return "PS3" in (o.name for o in obj.allowed_access_points.all())

    def PS4(self, obj):
        return "PS4" in (o.name for o in obj.allowed_access_points.all())

    def PS5(self, obj):
        return "PS5" in (o.name for o in obj.allowed_access_points.all())

    def PS6(self, obj):
        return "PS6" in (o.name for o in obj.allowed_access_points.all())

    def time_slots(self, obj):
        to_return = ""
        for o in obj.allowed_time_slots.all():
            to_return += " - " + o.name
        return to_return

    def drivers(self, obj):
        to_return = ""
        for o in obj.allowed_drivers.all():
            to_return += " - " + o.__str__()
        return to_return

    PS1.boolean = True
    PS1.short_description = "PS1"
    PS2.boolean = True
    PS2.short_description = "PS2"
    PS3.boolean = True
    PS3.short_description = "PS3"
    PS4.boolean = True
    PS4.short_description = "PS4"
    PS5.boolean = True
    PS5.short_description = "PS5"
    PS6.boolean = True
    PS6.short_description = "PS6"


admin.site.register(AccessPoint)
admin.site.register(TimeSlot)
admin.site.register(Driver)
admin.site.register(Vehicle)
admin.site.register(Pass, PassAdmin)
