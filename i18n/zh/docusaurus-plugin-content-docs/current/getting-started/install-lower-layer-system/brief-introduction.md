---
sidebar_label: 简要介绍
sidebar_position: 1
slug: /getting-started/install-lower-layer-system/brief-introduction
---

# 安装下层系统

## 简介

下层系统提供大禹系统所需的 Kubernetes/KubeEdge 集群、Sedna 运行时管理与 EdgeMesh 服务通信能力。
请先在云边集群完成这些组件的安装，再启动大禹系统支撑服务。

各组件作用见[架构总览](/docs/architecture/brief-architecture)。

## 配套组件

当前系统使用 `dayu-sedna v1.1` 与 `dayu-edgemesh v1.1`。两者必须使用相同 minor 版本，不要混用
不同版本的配套组件。

## 安装顺序

1. [准备节点](/docs/getting-started/install-lower-layer-system/prerequisites)。
2. 在云端节点[安装 Kubernetes](/docs/getting-started/install-lower-layer-system/install-kubernetes)。
3. [安装 KubeEdge](/docs/getting-started/install-lower-layer-system/install-kubeedge)并加入边缘节点。
4. [安装 EdgeMesh](/docs/getting-started/install-lower-layer-system/install-edgemesh)。
5. [安装 Sedna](/docs/getting-started/install-lower-layer-system/install-sedna)。
6. 按需[安装 NVIDIA GPU 支持](/docs/getting-started/install-lower-layer-system/install-nvidia-gpu-support)。

## 继续之前

- 确认所有目标节点为 `Ready`，且节点时钟已经同步。
- 确认 Sedna GM 可以与每个 LC 通信。
- 确认云端和边缘节点上的 EdgeMesh agent 健康。
- 确认带 endpoint 的 RuntimeService 可以达到 `Activated=True` 与 `Ready=True`；仅 Pod 运行并不足以证明服务可用。
- 集群、DNS、GPU 与路由问题可先查阅 [FAQs](/docs/getting-started/install-lower-layer-system/faqs)。
