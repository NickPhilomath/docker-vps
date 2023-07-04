
from django.shortcuts import render
from djoser.serializers import UserSerializer, UserCreateSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .osfunctions import *
from .models import Server, DOCKER_CONTANERS_LIMIT
from .serializers import ServerSerializer, CreateServerSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def user(request):
    if request.method == 'POST':
        user_serializer = UserCreateSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def vps(request):
    if request.method == 'GET':
        servers = Server.objects.filter(user=request.user)
        serializer = ServerSerializer(servers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        create_serializer = CreateServerSerializer(data=request.data)
        if create_serializer.is_valid():
            # check for servers limitation
            num_servers = Server.objects.filter(user=request.user).count()
            if num_servers >= DOCKER_CONTANERS_LIMIT:
                return Response({'detail': f'you cannot have more than {DOCKER_CONTANERS_LIMIT} servers'})

            # create vps server
            if create_server(create_serializer.validated_data, request.user) == EXIT_SUCCESS:
                return Response(status=status.HTTP_200_OK)
            return Response({'detail': 'cannot create server'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(create_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if request.method == 'DELETE':
        container_id = request.GET.get('id')
        if delete_server(container_id) == EXIT_SUCCESS:
            try:
                server = Server.objects.get(container=container_id).delete()
            except Server.DoesNotExist:
                return Response({'detail': 'the server with this id does not exists'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(status=status.HTTP_200_OK)
        return Response({'detail': 'an error occured while deleting server'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            


        """
        {
            "hostname":"hello",
            "os":"ub",
            "os_version":"ub-16",
            "password":"1234"
        }
        """