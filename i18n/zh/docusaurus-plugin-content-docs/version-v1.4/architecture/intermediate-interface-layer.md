---
sidebar_label: 中间接口层
sidebar_position: 3
slug: /architecture/intermediate-interface-layer
---

# 中间接口层

中间接口层把 KubeEdge 集群适配为大禹系统所需的运行时部署与通信模型。当前系统使用配套的
[Sedna v1.1](https://github.com/dayu-autostreamer/dayu-sedna/tree/v1.1) 和
[EdgeMesh v1.1](https://github.com/dayu-autostreamer/dayu-edgemesh/tree/v1.1)。

![Lower-layer structure](/img/architecture/lower-layer-structure.png)

## Sedna RuntimeService

`dayu.sh` 使用配置的 Sedna 支撑 CRD 启动长期运行的平台服务。应用运行时 worker 采用另一种方式：Backend 将 Scheduler、
Generator、Controller、Processor、Distributor 和 Monitor 实例渲染为不可变的 `sedna.io/v1alpha1` `RuntimeService`。

Sedna Global Manager 与 Local Controller 共同协调每个运行时 revision。只有当 Sedna 报告预期 spec，并返回精确的
RuntimeService、Service、Pod 身份且 `Activated=True`、`Ready=True` 时，Backend 才会发布该 worker。
这样可以避免“Pod 已运行但路由尚不可用”的状态进入活动运行时。

## EdgeMesh 路由

EdgeMesh 提供云端与边缘节点之间的服务通信。大禹系统集成会确认 RuntimeService 对应的精确 Service 与 Pod 身份，而不是把工作负载创建
本身当作就绪。Scheduler 将确认后的 endpoint 写入带版本的 `RuntimeDirectory`，运行时任务只携带这些精确路由。

运行时 worker 不会列举 Kubernetes 对象、刷新拓扑缓存或自行选择替代路由。Kubernetes 访问由 Backend 负责，路由权威由
Scheduler 负责；缺失或过期的路由身份会直接报错，而不会静默回退到其他副本。
