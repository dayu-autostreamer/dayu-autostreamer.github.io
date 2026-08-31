---
sidebar_label: 准备工作
sidebar_position: 1
slug: /getting-started/preparation
---

# 准备工作

## 部署路径

大禹系统分两个阶段安装：

1. 在云端和边缘节点安装下层集群组件。对一个集群通常只需执行一次。
2. 配置并启动大禹系统上层服务。之后可以按需分别启动和停止支撑层与应用运行时。

请先完成[下层系统安装](/docs/getting-started/install-lower-layer-system/brief-introduction)，再
[启动上层系统](/docs/getting-started/start-upper-layer-system/brief-introduction)。

## 环境检查清单

安装前请准备：

- 一台作为 Kubernetes/KubeEdge 控制面的 Linux 云端节点；
- 一台或多台具有稳定且唯一 hostname 的 Linux 边缘节点；
- 云端与边缘管理 endpoint 之间的网络连通性；
- 所有节点之间同步的系统时钟；
- Docker，以及可容纳镜像、挂载模型、数据源文件和大禹系统运行时状态的本地存储；
- 在运行 GPU processor 镜像的节点上提供可选 NVIDIA GPU 支持。

CPU、内存、GPU 和磁盘要求取决于所选 DAG、模型、数据源速率与副本数量，应按照实际工作负载而不是仅按照控制面估算。
当前安装指南使用 Kubernetes 1.22.2 与 KubeEdge 1.9.2，并要求配套使用 `dayu-sedna v1.1` 与
`dayu-edgemesh v1.1`。
