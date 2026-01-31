---
sidebar_label: 前置要求
slug: /getting-started/install-lower-layer-system/pre-requisites
---

# 前置要求

请在安装前完成前置要求的准备工作。

## 关闭防火墙（云边共用）
```bash
ufw disable	
```

## 开启 ipv 4 转发配置 iptables 参数（云边共用）
将桥接的 `IPv4/IPv6` 流量传递到 iptables 的链
```bash
modprobe br_netfilter

cat >> /etc/sysctl.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sysctl -p 
```

## 禁用 swap 分区（云边共用）
```bash
# 临时关闭
swapoff -a
# 永久关闭                                          
sed -ri 's/.*swap.*/#&/' /etc/fstab                 
```

## 设置主机名（云边共用）
```bash
# 为分布式集群的每个节点设置主机名
# 如:
# 云服务器
hostnamectl set-hostname master   
# 边
hostnamectl set-hostname edge1
hostnamectl set-hostname edge2
```

## 设置 DNS（云边共用）
```bash
# 不同主机上使用ifconfig查看ip地址
sudo vim /etc/hosts

# 根据自己的ip添加
# ip 主机名
192.168.247.128 master
192.168.247.129 edge1
```

## 安装并配置 docker（云边共用）
```bash
# X86/AMD64架构
sudo apt-get update
sudo apt-get install docker.io -y

sudo systemctl start docker
sudo systemctl enable docker

sudo docker --version

# ARM64 架构
sudo apt-get update
sudo apt-get install curl wget apt-transport-https ca-certificates software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=arm64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce

sudo docker --version

```

配置docker daemon
```bash
sudo vim /etc/docker/daemon.json

# 云服务器master节点添加：
{
  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}

# 边缘节点添加：
{
  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}

# 云/边都要执行
sudo systemctl daemon-reload
sudo systemctl restart docker

# 查看修改后的docker Cgroup的参数
docker info | grep Cgroup
```

为非root用户配置不需要sudo操作docker
```bash
sudo groupadd docker  # 创建组，如果已存在会报错，可忽略
sudo gpasswd -a ${USER} docker
sudo systemctl restart docker
sudo chmod a+rw /var/run/docker.sock

# 验证
docker images
```

如无法访问[Dockerhub](https://hub.docker.com/)，需设置docker镜像源，可参考[docker镜像源配置](/docs/developer-guide/configure-docker-registry).

## 设置跨节点时钟同步（云边共用）
分布式系统需要保证每个节点的时钟是同步的，采用NTP服务同步云边分布式节点

安装NTP服务
```bash
sudo apt update
sudo apt install ntp
```

配置NTP服务，修改/etc/ntp.conf文件

云端从公共NTP服务器同步时间
```
# Specify one or more NTP servers.

server 1.networktime.org iburst
server 2.networktime.org iburst
server ntp.synet.edu.cn iburst
server ntp.neu6.edu.cn iburst
server ntp.gwadar.cn iburst
server ntp.neu.edu.cn iburst
```

边端从云端同步时间
```
# Specify one or more NTP servers.
server 114.212.81.11  iburst
```

启动NTP服务
```bash
sudo systemctl start ntp
sudo systemctl enable ntp
```

验证时间同步状态
```bash
ntpq -p
```

