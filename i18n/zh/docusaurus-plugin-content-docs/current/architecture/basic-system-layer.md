---
sidebar_label: 基础系统层
sidebar_position: 2
slug: /architecture/basic-system-layer
---

# 基础系统层

基础系统层通过将 [KubeEdge 容器编排框架](https://kubeedge.io/) 部署在云边分布式节点上，从而为大禹调度系统提供底层的容器化编排支持。
`KubeEdge` 是华为为边缘场景提出的 [Kubernetes 框架](https://kubernetes.io/) 扩展，能很好地部署在资源有限、性能低下的设备上，从而在云服务器和边缘节点上建立容器化编排基础框架。


具体来说，`KubeEdge` 使用 `CloudCore` 组件和 `EdgeCore` 组件实现云边环境中的容器化应用编排和设备管理。
其中，云服务器（在整个云边分布式环境中，有且只有一个云服务器）上部署 `CloudCore` 组件，负责与边缘设备上的 `EdgeCore` 组件通信，并管理维护整个云边分布式设备集群，
使云服务器作为整个云边协同多设备中的 Master 管理节点；每个边缘设备上部署 `EdgeCore` 组件，负责管理设备本身以及与云服务器的 `CloudCore` 通信，维护云边协同的必要工作。


![lower-layer-structure.png](/img/architecture/lower-layer-structure.png)


