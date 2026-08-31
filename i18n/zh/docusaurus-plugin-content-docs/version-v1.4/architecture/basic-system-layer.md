---
sidebar_label: 基础系统层
sidebar_position: 2
slug: /architecture/basic-system-layer
---

# 基础系统层

基础系统层提供大禹系统运行所需的集群、网络和容器运行环境。Kubernetes 管理云端控制面，
[KubeEdge](https://kubeedge.io/) 将 workload 与设备管理扩展到边缘节点。

| 组件 | 在大禹系统部署中的作用 |
| --- | --- |
| Kubernetes control plane | 保存集群资源并调度云端 workload。 |
| KubeEdge CloudCore | 连接 Kubernetes 控制面与边缘节点。 |
| KubeEdge EdgeCore | 运行在各边缘节点上，维护云端连接和本地 workload。 |
| Container runtime 与集群网络 | 拉取镜像、启动容器，并提供 Pod/Service 连通性。 |

大禹系统将 Kubernetes 访问集中在 Backend。Generator、Controller、Processor、Distributor、Scheduler 与
Monitor 通过大禹系统运行时契约和已发布的精确路由协作，不自行查询集群。这个应用边界仍然依赖健康的
Kubernetes/KubeEdge 基础，以及下一层说明的配套 Sedna 与 EdgeMesh 扩展。

![Kubernetes 与 KubeEdge 底层结构](/img/architecture/lower-layer-structure.png)
