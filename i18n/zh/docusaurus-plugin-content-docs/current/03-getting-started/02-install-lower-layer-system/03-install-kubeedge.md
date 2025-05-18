---
sidebar_label: 安装KubeEdge
slug: /getting-started/install-lower-layer-system/install-kubeedge
custom_edit_url: null
---

# 安装KubeEdge

## 下载 keadm（云边共用）

keadm主要用于 kubeedge 管理、安装和使用

官方发行版本链接：[Release KubeEdge v1.9.2 release · kubeedge/kubeedge (github.com)](https://github.com/kubeedge/kubeedge/releases/)

```bash
#查看自己的架构
uname -a
#下载对应版本以及架构
wget https://github.com/kubeedge/kubeedge/releases/download/v1.9.2/keadm-v1.9.2-linux-amd64.tar.gz
#解压
tar zxvf keadm-v1.9.2-linux-amd64.tar.gz
#添加执行权限
chmod +x keadm-v1.9.2-linux-amd64/keadm/keadm 
#移动目录
cp keadm-v1.9.2-linux-amd64/keadm/keadm /usr/local/bin/
```

## 启动 KubeEdge（云端）

可能出现 [问题四：10002 already in use](/docs/getting-started/install-lower-layer-system/faqs#问题四10002-already-in-use)

### 重置环境（第一次安装时跳过）

```bash
keadm reset
```

### 启动 cloudcore

通过 keadm 启动
```bash
#注意修改--advertise-address的ip地址
keadm init --advertise-address=114.212.81.11 --kubeedge-version=1.9.2

#打开转发路由
kubectl get cm tunnelport -n kubeedge -o yaml
#找到10350 或者10351
#set the rule of trans，设置自己的端口
export CLOUDCOREIPS=xxx.xxx.xxx.xxx

# dport的内容对应tunnelport
iptables -t nat -A OUTPUT -p tcp --dport 10351 -j DNAT --to $CLOUDCOREIPS:10003

cd /etc/kubeedge/

# 或者从网站下载 https://github.com/kubeedge/kubeedge/blob/master/build/tools/certgen.sh
wget https://raw.githubusercontent.com/kubeedge/kubeedge/refs/heads/master/build/tools/certgen.sh

bash certgen.sh stream
```

### cloudcore 配置

```bash
vim /etc/kubeedge/config/cloudcore.yaml

# 修改 cloudcore.yaml 内容
modules:
  ..
  cloudStream:
    enable: true
    streamPort: 10003
  ..
  dynamicController:
    enable: true
```

重启 cloudcore：
```bash
sudo systemctl restart cloudcore.service
```

如果直接重启cloudcore失败，解决方法如下：
```bash
# 将生成的cloudcore.service放到systemctl管理的文件夹下
cp /etc/kubeedge/cloudcore.service /etc/systemd/system
```

使用 `journalctl -u cloudcore.service -xe` 查看cloudcore是否正常运行且没有报错

## 加入KubeEdge集群（边端）

可能出现 [问题五：edgecore-符号链接已存在](/docs/getting-started/install-lower-layer-system/faqs#问题五edgecore-符号链接已存在)

如果 `keadm join` 失败可以从 `keadm reset` 开始重新尝试

### 重置环境（第一次安装时跳过）
```bash
# 重启
keadm reset

# 重新加入时，报错存在文件夹，直接删除
rm -rf /etc/kubeedge

# docker容器占用(通常是mqtt)
docker ps -a
docker stop mqtt
docker rm mqtt
```

### 启动 edgecore

启动edgecore时，需要在云端获取token:
```bash
keadm gettoken
```

在边端执行:
```bash
# 注意这里是要加入master的IP地址，token是master上获取的
keadm join --cloudcore-ipport=114.212.81.11:10000 --kubeedge-version=1.9.2 --token=9e1832528ae701aba2c4f7dfb49183ab2487e874c8090e68c19c95880cd93b50.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk1NjU4MzF9.1B4su4QwvQy_ZCPs-PIyDT9ixsDozfN1oG4vX59tKDs
```

可能出现 [问题二十五：边端join报错](/docs/getting-started/install-lower-layer-system/faqs#问题二十五边端join报错)

```bash
# 加入后，先查看信息
journalctl -u edgecore.service -f
```

