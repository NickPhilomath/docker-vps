from django.db import models
from django.contrib.auth.models import User

SERVER_STATUS = [
    ('i', 'Installing'),
    ('r', 'Running'),
    ('s', 'Stopped'),
]
SERVER_STATUS_DEFAULT = 'i'

# Create your models here.
class Server(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    container = models.CharField(max_length=64, unique=True)
    status = models.CharField(max_length=1, choices=SERVER_STATUS, default=SERVER_STATUS_DEFAULT)
    # operating system
    # memory usage limit
    # storeage usage limit
