---
sidebar_label: Pre-requisites
slug: /getting-started/install-lower-layer-system/pre-requisites
custom_edit_url: null
---

# Pre-requisites

Please prepare for pre-requisites before installation, involving 

## Turn off the firewall (both cloud/edge)
```bash
ufw disable	
```

## Enable IPv4 forwarding configuration iptables parameters (both cloud/edge)
Translate the bridged `IPv4/IPv6` traffic to the iptables chain
```bash
modprobe br_netfilter

cat >> /etc/sysctl.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sysctl -p 
```

## Disable swap partition on disk (both cloud/edge)
```bash
# Temporary
swapoff -a
# Permanent                                        
sed -ri 's/.*swap.*/#&/' /etc/fstab
```

## Set hostname (both cloud/edge)
```bash
# Set hostname for each node
# such as:
# cloud (master)
hostnamectl set-hostname master   
# edge
hostnamectl set-hostname edge1
hostnamectl set-hostname edge2
```

## Set DNS (both cloud/edge)
```bash
# view ip address on different nodes
ipconfig

# add all ip address to each node
sudo vim /etc/hosts
# such as:
# (ip hostname)
192.168.247.128 master
192.168.247.129 edge1
```

## Install and configure docker (both cloud/edge)
```bash
# X86/AMD64
sudo apt-get update
sudo apt-get install docker.io -y

sudo systemctl start docker
sudo systemctl enable docker

sudo docker --version

# ARM64
sudo apt-get update
sudo apt-get install curl wget apt-transport-https ca-certificates software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=arm64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce

sudo docker --version

```

Configure docker daemon
```bash
sudo vim /etc/docker/daemon.json

# on cloud (master) add：
{
  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}

# on edge add：
{
  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}

# execute both on cloud/edge:
sudo systemctl daemon-reload
sudo systemctl restart docker

# check docker Cgroup
docker info | grep Cgroup
```

Configure Docker for non-root users without sudo operation
```bash
sudo groupadd docker  # Create a group (if already exists, an error will be reported, ignore it)
sudo gpasswd -a ${USER} docker
sudo systemctl restart docker
sudo chmod a+rw /var/run/docker.sock

# validation
docker images
```

If unable to access [Dockerhub](https://hub.docker.com/), you need to configure Docker registry, 
and you can refer to [Docker Registry Configuration](/docs/developer-guide/how-to-build/docker-registry) for instructions.

## Set cross-node clock synchronization (both cloud/edge)

Distributed systems need to ensure that the clocks of each node are synchronized, using NTP services to synchronize the cloud-edge distributed nodes.

Install NTP Service.
```bash
sudo apt update
sudo apt install ntp
```

To configure NTP service, you should `vim /etc/ntp.conf`.

For cloud node, synchronize time from public NTP servers.
```
# Specify one or more NTP servers.
server 1.networktime.org iburst
server 2.networktime.org iburst
server ntp.synet.edu.cn iburst
server ntp.neu6.edu.cn iburst
server ntp.gwadar.cn iburst
server ntp.neu.edu.cn iburst
```

For edge node, synchronize time from the cloud node.
```
# Specify one or more NTP servers.
server 114.212.81.11  iburst
```

Start NTP service.
```bash
sudo systemctl start ntp
sudo systemctl enable ntp
```

Verify the time synchronization status.
```bash
ntpq -p
```

