from rest_framework import serializers

from .models import Vehicle, Pass, Driver, AccessPoint, TimeSlot, Access


class DriverSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Driver
        fields = ('first_name', 'last_name', 'entity_name',)


class AccessPointSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = AccessPoint
        fields = ('id', 'name',)


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = TimeSlot
        fields = ('id', 'name', 'begins_at', 'ends_at',)


class VehicleSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Vehicle
        fields = ('numberplate',)


class PassSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer()
    allowed_drivers = DriverSerializer(many=True)
    allowed_access_points = AccessPointSerializer(many=True)
    allowed_time_slots = TimeSlotSerializer(many=True)

    class Meta(object):
        model = Pass
        fields = ('id', 'comment', 'vehicle', 'allowed_drivers', 'allowed_access_points', 'allowed_time_slots',)


class AccessSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Access
        fields = ('id', 'type', 'numberplate', 'access_point', 'comment', 'created_at',)
        read_only_fields = ('id', 'created_at',)


class AccessCommentSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Access
        fields = ('id', 'comment',)
        read_only_fields = ('id',)
