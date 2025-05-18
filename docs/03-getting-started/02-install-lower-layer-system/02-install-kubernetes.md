---
sidebar_label: Install Kubernetes
slug: /getting-started/install-lower-layer-system/install-kubernetes
custom_edit_url: null
---

# Install Kubernetes

[TBD]


##  Add sources（both cloud/edge）
```bash
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -

cat > /etc/apt/sources.list.d/kubernetes.list <<EOF
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

sudo apt-get update
```

## Install Kubernetes components (cloud)

Install the following software packages on the cloud:
- `kubeadm`：used to initialize the cluster.
- `kubelet`：used to launch pods on each node in the cluster.
- `kubectl`：command-line tool used to communicate with the cluster.

See the corresponding Kubernetes and KubeEdge versions at [kubeedge/kubeedge](https://github.com/kubeedge/kubeedge)
```bash
# Check software version
apt-cache madison kubeadm

# Install the corresponding version of k8s components: kubelet kubeadm kubectl
sudo apt-get update
sudo apt-get install -y kubelet=1.22.2-00 kubeadm=1.22.2-00 kubectl=1.22.2-00 

# Lock version
sudo apt-mark hold kubelet kubeadm kubectl
```

## Start Kubernetes cluster (cloud)

This step may occur [Question 1: kube-proxy report iptables problems](/docs/getting-started/install-lower-layer-system/faqs#question-1-kube-proxy-report-iptables-problems), [Question 2: calico and coredns are always in initializing state](/docs/getting-started/install-lower-layer-system/faqs#question-2-calico-and-coredns-are-always-in-initializing-state) and [Question 3：metrics-server keeps unsuccessful state](/docs/getting-started/install-lower-layer-system/faqs#question-3metrics-server-keeps-unsuccessful-state)

### Reset Environment (Skip on first installation)

```bash
swapoff -a
kubeadm reset
systemctl daemon-reload
systemctl restart docker kubelet
rm -rf $HOME/.kube/config
rm -f /etc/kubernetes/kubelet.conf    # Delete k8s configuration file
rm -f /etc/kubernetes/pki/ca.crt    # Delete k8s certificate
rm -rf /etc/cni/net.d/  # Delete network configuration
iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
```

### Initialize Kubernetes cluster

```bash
kubeadm init --pod-network-cidr 10.244.0.0/16 \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# If there is only one node, it needs to accommodate the stain.
kubectl taint nodes --all node-role.kubernetes.io/master node-role.kubernetes.io/master-
```

## Download and configure calico (cloud)

In the Kubernetes cluster, pods are distributed across different hosts. 
To enable inter-host communication for these pods, it is necessary to install the CNI network plugin, and here, Calico network is chosen.

在 k8s 集群初始化后，如果不配置 calico 等相关网络插件，会发现 coredns 一直处在 pending 或 containerCreating 状态，通过 `kubectl describe` 会发现提示缺少网络组件。

步骤 1：在 master 上下载配置 calico 网络的 yaml

```bash
# pay attention to the corresponding version, v1.22 and v3.20
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

