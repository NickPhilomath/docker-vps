import os
import platform
from django.shortcuts import render
from djoser.serializers import UserSerializer, UserCreateSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Server

EXIT_SUCCESS = 0
EXIT_FALUERE = 1
# detect platform
PLATFORM = platform.system()
PLATFORM_WINDOWS = PLATFORM == 'Windows'
PLATFORM_LINUX = PLATFORM == 'Linux'
print(PLATFORM, PLATFORM_WINDOWS)


@api_view(['POST'])
@permission_classes([AllowAny])
def user(request):
    if request.method == 'POST':
        user_serializer = UserCreateSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def vps(request):
    # create virtual server
    if PLATFORM_WINDOWS:
        result = os.system('.\scripts\createserver.bat')
    elif PLATFORM_LINUX:
        result = os.system('.\scripts\createserver.sh')
    else:
        return
    
    if result == EXIT_SUCCESS:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'cannot create server'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)