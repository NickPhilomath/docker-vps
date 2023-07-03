from rest_framework import serializers

from .models import Server

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'

class CreateServerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255)

    class Meta:
        model = Server
        fields = ['hostname', 'os', 'os_version', 'password']