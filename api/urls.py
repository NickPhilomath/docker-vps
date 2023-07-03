from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import user, vps

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/', user, name='user'),
    path('vps/', vps, name='vps'),
]