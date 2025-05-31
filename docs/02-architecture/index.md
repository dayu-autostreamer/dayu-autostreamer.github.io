---
slug: /architecture
custom_edit_url: null
---

# Brief Architecture

[TBD]

Dayu system has a five-layer architecture. Among them, the **basic system layer** and **intermediate interface layer** form the lower-layer system, mainly containing infrastructure structures that support container orchestration, custom task deployment, and cross-heterogeneous node communication, providing basic guarantees for stream data processing applications;

The system support layer, collaborative scheduling layer, and application service layer form the upper system, mainly containing functional components that support context awareness, computational decision-making, and process control, providing integrated processing, scheduling, and monitoring services for the full process of stream data processing applications.

大禹系统拥有五层架构，
其中，基础系统层和中间接口层构成了下层系统，主要包含支持容器化编排、自定义任务下装、跨异构节点通信的基础设施结构，为流数据处理应用提供底层保障；
系统支撑层、协同调度层、应用服务层构成了上层系统，主要包含支撑情境感知、计算决策、流程控制的功能组件，为流数据处理应用提供感算控一体化处理、调度、监控的全流程服务。

![arch](/img/architecture/arch.png)

具体来说，每层的详细功能如下：

- 基础系统层：该层采用 `KubeEdge` 容器编排架构，部署在云边协同环境的所有分布式节点上。`KubeEdge` 是华为为边缘场景提出的 `Kubernetes` 框架扩展，能很好地部署在资源有限、性能低下的设备上，从而在云服务器和边缘节点上建立容器化编排基础框架。
- 中间接口层：该层通过修改和扩展官方接口组件 `Sedna` 和通信组件 `EdgeMesh`，提供定制化的容器服务安装和组件通信，从而满足整体系统的应用部署和节点通信需求。
- 系统支撑层：该层为整个系统提供支持服务，包含前端服务器（为用户提供交互式UI）、后端服务器（响应前端请求，完成任务的自动安装）和数据源服务器（模拟真实数据源）。
- 协同调度层：该层由我们自主开发的多个功能组件组成，为流数据处理应用提供处理、调度、监控等全流程细粒度操作，从而支持实时流数据分析流水线的处理。
- 应用服务层：该层以容器化无状态微服务的形式接收用户自定义的服务应用。只要用户根据平台定义的统一接口需求开发服务，就可以以容器形式嵌入平台，并编排成流水线，从而在云边节点之间的协同调度执行。


