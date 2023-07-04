import os
import socket
import platform
import subprocess

from .models import *

# register created images here
OS_DOCKER_IMAGES = [
    (OSV_UBUNTU_16, 'ubuntu-16.04-subvps')
]

EXIT_SUCCESS = 0
EXIT_FAILURE = 1
# detect platform
PLATFORM = platform.system()
PLATFORM_WINDOWS = PLATFORM == 'Windows'
PLATFORM_LINUX = PLATFORM == 'Linux'

def get_free_port():
    sock = socket.socket()
    sock.bind(('', 0))
    return sock.getsockname()[1]

def change_root_password(container_id, password):
    # store the password in root directory
    result = subprocess.run(['docker', 'exec', container_id, 'bash', '-c', f"echo 'echo root:{password} | chpasswd' >> root/passwd.sh"], stdout=subprocess.PIPE)
    if result.returncode != EXIT_SUCCESS:
        return EXIT_FAILURE
    
    # run shell file password stored
    result = subprocess.run(['docker', 'exec', container_id, 'bash', '/root/passwd.sh'])
    if result.returncode != EXIT_SUCCESS:
        return EXIT_FAILURE
    return EXIT_SUCCESS

def create_server(create_info, user):
    # find requested image name
    image_name = None
    for docker_image in OS_DOCKER_IMAGES:
        if docker_image[0] == create_info['os_version']:
            image_name = docker_image[1]

    if not image_name:
        return EXIT_FAILURE

    port = get_free_port()
    result = subprocess.run(['docker', 'run', '-dp', str(port) + ':22', image_name], stdout=subprocess.PIPE)
    container_id = result.stdout.decode("utf-8").replace("\n", "")
    
    if result.returncode != EXIT_SUCCESS:
        return EXIT_FAILURE

    if change_root_password(container_id, create_info['password']) != EXIT_SUCCESS:
        return EXIT_FAILURE

    server = Server()
    server.user_id = user.id
    server.hostname = create_info['hostname']
    server.container = container_id
    server.port = port
    server.status = STATUS_RUNNING
    server.os = create_info['os']
    server.os_version = create_info['os_version']
    server.save()

    return EXIT_SUCCESS

def delete_server(container_id):
    result = subprocess.run(['docker', 'rm', '-f', container_id], stdout=subprocess.PIPE)
    if result.returncode != EXIT_SUCCESS:
        return EXIT_FAILURE
    return EXIT_SUCCESS

