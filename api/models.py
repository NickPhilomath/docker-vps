from django.db import models
from django.contrib.auth.models import User

DOCKER_CONTANERS_LIMIT = 3

STATUS_INSTALLING = 'i'
STATUS_RUNNING = 'r'
STATUS_STOPPED = 's'
STATUS_ERROR = 'e'
SERVER_STATUS = [
    (STATUS_INSTALLING, 'Installing'),
    (STATUS_RUNNING, 'Running'),
    (STATUS_STOPPED, 'Stopped'),
    (STATUS_ERROR, 'Error'),
]

OS_UBUNTU = 'ub'
OS_CENTOS = 'co'
OPERATING_SYSTEM = [
    (OS_UBUNTU, 'Ubuntu'),
    (OS_CENTOS, 'CentOS'),
]

# Ubuntu
OSV_UBUNTU_22 = OS_UBUNTU + '-22'
OSV_UBUNTU_20 = OS_UBUNTU + '-20'
OSV_UBUNTU_16 = OS_UBUNTU + '-16'
# CentOS
OSV_CENTOS_9 = OS_CENTOS + '-9'
OSV_CENTOS_8 = OS_CENTOS + '-8'
# 
OS_VERSION = [
    (OSV_UBUNTU_22, '22.04 (LTS) x64'),
    (OSV_UBUNTU_20, '20.04 (LTS) x64'),
    (OSV_UBUNTU_16, '16.04 (LTS) x64'),
    (OSV_CENTOS_9, '9 Stream x64'),
    (OSV_CENTOS_8, '8 Stream x64'),
]

# Create your models here.
class Server(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hostname = models.CharField(max_length=255)
    container = models.CharField(max_length=64, null=True)
    port = models.IntegerField(null=True)
    status = models.CharField(max_length=1, choices=SERVER_STATUS, default=STATUS_INSTALLING)
    os = models.CharField(max_length=2, choices=OPERATING_SYSTEM) #, default=OS_UBUNTU)
    os_version = models.CharField(max_length=5, choices=OS_VERSION) #, default=OSV_UBUNTU_16)
    # memory usage limit
    # storeage usage limit
