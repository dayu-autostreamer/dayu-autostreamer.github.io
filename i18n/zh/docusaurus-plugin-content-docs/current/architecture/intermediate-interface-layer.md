---
sidebar_label: 中间接口层
sidebar_position: 3
slug: /architecture/intermediate-interface-layer
---

# 中间接口层

中间接口层基于 KubeEdge 系统部署，负责对接大禹调度系统的定制化需求，通过自定义组件的形式定制大禹调度系统需要的服务下装和节点通信接口。
我们通过修改和扩展官方的 [服务下装组件 Sedna](https://sedna.readthedocs.io/) 和 [节点通信组件 EdgeMesh](https://edgemesh.netlify.app/) 构建中间接口层。

![lower-layer-structure.png](/img/architecture/lower-layer-structure.png)

**Sedna:**

Sedna 通过在Master节点（云服务器）上部署全局管理器 Global Manager 、在每个设备上（包括云服务器）部署本地控制器 Local Controller（为便于与上层系统中的组件名区分，这里我们将 Local Controller 改名为 Local Manager），
实现云边分布式系统上的统一服务下装与管理。

具体来说，Global Manager 负责云边定制化服务维护、云边服务协同处理、云边分布式配置管理等，可以通过定制化CRD的方式扩展新的云边协同服务；Local Manager 负责在每个设备上维护具体的服务运行时，其接受 Global Manager 的控制指令维护下装的服务组件，并将每个服务组件作为一个Worker管理，从而实现分布式系统上的跨设备服务维护。

需要注意的是，在大禹调度系统中，上层系统中系统支撑层、协同调度层、应用服务层的功能组件都是以Worker的形式在 Sedna 中托管。我们通过修改扩展 Global Manager 和 Local Controller 中的CRD模板和CRD控制器，定制化实现大禹调度系统服务下装过程中需要的参数传递和文件挂在等过程 ([大禹定制版 Sedna](https://github.com/dayu-autostreamer/dayu-sedna))。

**EdgeMesh:**

EdgeMesh 通过在每个节点上部署 EdgeMesh Agent 组件，为云边分布式协同系统中不同节点上的Pod间通信提供高效方式，其具有高效路由、自动负载均衡等特性，适合大规模云边场景下的跨设备通信。

根据大禹调度系统的需求，我们定制化修改了 EdgeMesh Agent 组件中的负载均衡算法策略，使其从原本的简单所有设备轮询转化为对特定目标设备的多个POD做负载均衡，从而对接上层系统的通信需求([大禹定制版 EdgeMesh](https://github.com/dayu-autostreamer/dayu-edgemesh))。


