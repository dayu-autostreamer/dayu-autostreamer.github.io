---
sidebar_label: 安装Kubernetes
slug: /getting-started/install-lower-layer-system/install-kubernetes
---

# 安装Kubernetes

##  添加阿里源（云边共用）
```bash
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -

cat > /etc/apt/sources.list.d/kubernetes.list <<EOF
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

sudo apt-get update
```

## 安装相关组件（云端）

需要在云端上安装以下的软件包：
- `kubeadm`：用来初始化集群的指令。  
- `kubelet`：在集群中的每个节点上用来启动 Pod 和容器等。  
- `kubectl`：用来与集群通信的命令行工具。

k8s和kubeedge版本对应见 [kubeedge/kubeedge](https://github.com/kubeedge/kubeedge)
```bash
# 查看软件版本
apt-cache madison kubeadm

# 安装对应版本的k8s组件 kubelet kubeadm kubectl
sudo apt-get update
sudo apt-get install -y kubelet=1.22.2-00 kubeadm=1.22.2-00 kubectl=1.22.2-00 

# 锁定版本
sudo apt-mark hold kubelet kubeadm kubectl
```

## 启动集群（云端）

该步可能会出现 [问题一：kube-proxy 报 iptables 问题](/docs/getting-started/install-lower-layer-system/faqs#问题一kube-proxy-报-iptables-问题) 、 [问题二：calico 和 coredns 一直处于初始化](/docs/getting-started/install-lower-layer-system/faqs#问题二calico-和-coredns-一直处于初始化) 、 [问题三：metrics-server一直无法成功](/docs/getting-started/install-lower-layer-system/faqs#问题三metrics-server一直无法成功)

### 重置环境（第一次安装时跳过）

```bash
swapoff -a
kubeadm reset
systemctl daemon-reload
systemctl restart docker kubelet
rm -rf $HOME/.kube/config
rm -f /etc/kubernetes/kubelet.conf    #删除k8s配置文件
rm -f /etc/kubernetes/pki/ca.crt    #删除K8S证书
rm -rf /etc/cni/net.d/  # 删除网络配置
iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
```

### 初始化 k8s 集群

```bash
kubeadm init --pod-network-cidr 10.244.0.0/16 \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers

# 上一步创建成功后，会提示：主节点执行提供的代码
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 如果只有一个节点，需要容纳污点
kubectl taint nodes --all node-role.kubernetes.io/master node-role.kubernetes.io/master-
```

## 下载配置 calico（云端）

在整个 kubernetes 集群里，pod 分布在不同的主机上，为了实现这些 pod 的跨主机通信必须安装 CNI 网络插件，这里选择 calico 网络。

在 k8s 集群初始化后，如果不配置 calico 等相关网络插件，会发现 coredns 一直处在 pending 或 containerCreating 状态，通过 `kubectl describe` 会发现提示缺少网络组件。

步骤 1：在 master 上下载配置 calico 网络的 yaml

```bash
# 注意对应版本，v1.22和v3.20
wget https://docs.projectcalico.org/v3.20/manifests/calico.yaml --no-check-certificate
```

步骤 2：修改 calico.yaml 里的 pod 网段

```bash
# 把calico.yaml里pod所在网段改成kubeadm init时选项--pod-network-cidr所指定的网段，
 #直接用vim编辑打开此文件查找192，按如下标记进行修改：

# no effect. This should fall within `--cluster-cidr`.
# - name: CALICO_IPV4POOL_CIDR
#   value: "192.168.0.0/16"
# Disable file logging so `kubectl logs` works.
- name: CALICO_DISABLE_FILE_LOGGING
  value: "true"

# 把两个#及#后面的空格去掉，并把192.168.0.0/16改成10.244.0.0/16，如下：

# no effect. This should fall within `--cluster-cidr`.
- name: CALICO_IPV4POOL_CIDR
  value: "10.244.0.0/16"
# Disable file logging so `kubectl logs` works.
- name: CALICO_DISABLE_FILE_LOGGING
  value: "true"
```

步骤 3：提前下载所需要的镜像。
```bash
# 查看此文件用哪些镜像：
grep image calico.yaml

# image: calico/cni:v3.20.6
# image: calico/cni:v3.20.6
# image: calico/pod2daemon-flexvol:v3.20.6
# image: calico/node:v3.20.6
# image: calico/kube-controllers:v3.20.6
```

在 master 节点中下载上述镜像
```bash
# 换成自己的版本
for i in calico/cni:v3.20.6 calico/pod2daemon-flexvol:v3.20.6 calico/node:v3.20.6 calico/kube-controllers:v3.20.6 ; do docker pull $i ; done
```

> calico 只需要在 master 上存在

步骤 4：启动 calico
```bash
# 一定要执行，不然coredns无法初始化
kubectl apply -f calico.yaml

# 检查启动状态，需要都running，除了calico可以不用
kubectl get pods -A
```

步骤 5：对 calico 和 kube-proxy 进行配置

Edge 节点加入时可能会自动部署 calico-node 和 kube-proxy，kube-proxy 会部署成功（但是 edgecore 的 log 会提示不应该部署 kube-proxy），calico 会初始化失败。为了避免上述情况，做如下操作：

```bash
kubectl get daemonset -n kube-system | grep -v NAME | awk '{print $1}' |xargs -n 1 kubectl patch daemonset -n kube-system --type='json' -p='[{"op":"replace","path":"/spec/template/spec/affinity","value":{"nodeAffinity":{"requireDuringSchedulingIgnoredDuringExecution":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"node-role.kubernetes.io/edge","operator":"DoesNotExist"}]}]}}}}]'

kubectl edit daemonset -n kube-system kube-proxy

# 添加以下内容
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: node-role.kubernetes.io/edge
                operator: DoesNotExist

# calico-node添加相同内容
kubectl edit daemonset -n kube-system calico-node
```

![kube-proxy.png](/img/install/kube-proxy.png)

使用 `kubectl get pods -A` 看看calico相关的 pod 是否都在 running，通过 `kubectl logs [pod_name] -n [namespace]` 查看calico组件内部是否有报错。


[//]: # (<img src="/img/install/kube-proxy.png" alt="kube-proxy" style="zoom:60%;" />)


## 下载配置 metrics-service（云端）

### 下载metrics-service

metrics-service 用于追踪边缘节点日志，可以安装metrics-service来帮助监测云边分布式集群。

下载方法包括官网安装与本地安装，如果官网安装方式失败可尝试本地安装方式。

**官网安装** (可能会出错, 拉取镜像超时问题)：
```bash
# 安装metrics-service
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
# 检查pod状态
kubectl get pods -A
```

![metrics-service-official-install](/img/install/metrics-service-official-install.png)

**本地安装**

先下载官方提供的yaml
```bash
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

使用`vim components.yaml`，先查看yaml文件中官方的镜像版本，然后去 [dockerhub](https://hub.docker.com/) 搜索对应版本的非官方镜像，并在yaml文件中添加`- --kubelet-insecure-tls`，修改镜像名：
```bash
    spec:
      containers:
      - args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        - --kubelet-insecure-tls
        image: mingyangtech/klogserver:v0.6.4
```

![metrics-service-local-install](/img/install/metrics-service-local-install.png)

从定制后的yaml文件安装
```bash
# 手动 pull 镜像
docker pull mingyangtech/klogserver:v0.6.4
# 安装
kubectl apply -f components.yaml
```

### 验证metrics-service

检验是否部署成功
```bash
kubectl top nodes
```

