# Use the official image as a parent image
FROM ubuntu:16.04

# Update the system
RUN apt-get update && apt-get upgrade -y && apt-get -y install sudo

# Install OpenSSH Server
RUN apt-get install -y openssh-server

# Set up configuration for SSH
RUN mkdir /var/run/sshd
# RUN echo 'root:1234' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise, user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# Expose the SSH port
EXPOSE 22

# Run SSH
CMD ["/usr/sbin/sshd", "-D"]