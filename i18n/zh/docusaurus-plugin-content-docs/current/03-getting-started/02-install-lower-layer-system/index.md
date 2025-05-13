---
slug: /getting-started/install-lower-layer-system
custom_edit_url: null
---

# 安装大禹下层系统

## 简介

大禹的下层系统是整个系统的基础，主要由KubeEdge及部分插件构成，需要提前安装在云边分布式节点上，下层系统具体的作用与结构请参照[大禹系统结构](/docs/architecture)。

## 安装流程

请按照以下流程安装

- [前置要求](/docs/getting-started/install-lower-layer-system/pre-requisites)
- [安装 Kubernetes](/docs/getting-started/install-lower-layer-system/install-kubernetes)
- [安装 KubeEdge](/docs/getting-started/install-lower-layer-system/install-kubernetes)
- [安装 EdgeMesh](/docs/getting-started/install-lower-layer-system/install-kubeedge)
- [安装 Sedna](/docs/getting-started/install-lower-layer-system/install-edgemesh)
- [安装 Nvidia GPU 支持](/docs/getting-started/install-lower-layer-system/install-nvidia-gpu-support)


## 提示

安装下层系统前请先阅读提示：

- 由于安装任务是在云边分布式节点集群上进行的，所有操作前请确认该操作的**执行位置**
- **Kubernetes 只需要安装在 master 节点（云服务器）上**，其他的节点都不用
- KubeEdge安装在所有节点上， 运行前提是 master 上必须有 k8s
- 一些插件比如 calico、edgemesh、sedna、metric-service 还有 kuborad 等，都是通过 yaml 文件启动的，所以实际要下载的是k8s 的控制工具 kubeadm 和 kubeedge 的控制工具 keadm;提前准备好刚才的 yaml 文件，启动 k8s 和 kubeedge 后，直接根据 yaml 文件容器创建
- **calico 只需要安装在 master 上**，它是节点通信的插件，如果没有这个，master 上安装 kubeedge 的 coredns 会报错；但是，边缘节点上不需要安装calico，因为 kubeedge 针对边缘节点做了自己的通信机制  
- namespace 可以看作不同的虚拟项目，service 是指定的任务目标文件，pods 是根据 service 或者其他 yaml 文件创建的具体容器  
- 一个物理节点上可以有很多个 pods，pods 是可操作的最小单位，一个 service 可以设置很多 pods，一个 service 可以包含很多物理节点  
- 一个 pods 可以看作一个根据 docker 镜像创建的实例  
- **如果是主机容器创建任务，要设置 dnsPolicy**（很重要，可能导致sedna-lc异常报错）
- 拉取 docker 镜像的时候，**一定要先去确认架构(amd64/arm64)是否支持**
- 建议直接进入root用户执行系统部署，部署完成后可退出root用户
- 部署前可以先熟悉[常用命令](/docs/getting-started/install-lower-layer-system/common-commands)
- 遇到问题请先查看看[Q&A](/docs/getting-started/install-lower-layer-system/faqs)
- 下层系统的大部分组件都是依托于官方/开源软件架构定制的，因此如在安装过程中遇到无法解决的问题，可以自行搜索问题尝试解决，也可以给我们[提issue](https://github.com/dayu-autostreamer/dayu/issues)或[联系我们](/docs/community/contact-us)

