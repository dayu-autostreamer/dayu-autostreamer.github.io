---
sidebar_label: 协同调度层
slug: /architecture/collaboration-scheduling-layer
custom_edit_url: null
---

# 协同调度层

协同调度层是大禹调度系统实现核心功能服务的主要结构，其由我们自主开发的多个功能组件组成，
为流数据处理应用提供处理、调度、监控等全流程细粒度操作，从而支持实时流数据分析流水线的处理。
具体来说，协同调度层主要由**生成器**、**控制器**、**处理器**、**分发器**、**调度器**、**监控器**这六个功能性组件组成。

![upper-layer-structure.png](/img/architecture/upper-layer-structure.png)

**生成器**（`Generator`）负责实时捕获流数据和生成流数据处理任务。每个边缘节点上部署一个生成器，同时每个生成器可以绑定到一个流数据源，
在捕获数据源的流数据后根据调度器给出的配置决策对流数据进行切分、预处理等操作，形成流数据处理任务，并根据卸载决策将待处理任务发往对应节点的控制器进行进一步地分析处理。

**控制器**（`Controller`）负责控制流数据处理任务在云边分布式设备上的转发过程。云边分布式集群中的每一个设备上会部署一个控制器，流数据处理任务在设备间进行转发时会优先进入控制器，
控制器在根据任务的当前状态完成具体的转发，转发逻辑具体包括往当前设备的对应阶段处理器完成AI算法处理、发往其他设备继续处理、发往分发器存储已完成的任务数据等。

**处理器**（`Processor`）负责对流数据任务完成特定的AI算法处理使用 AI 算法处理数据。
在应用服务层中，一个流数据处理应用可能包含一个或多个处理阶段，每个处理阶段对应一个具体的AI应用服务，
因此，每个处理器封装嵌入一个AI应用服务的具体逻辑，并对外暴露统一接口，从而可以方便地完成流数据处理服务调用。
每个设备上会部署所有阶段的处理器，从而可以方便地将任意阶段任务卸载到任意节点上执行。

**分发器**（`Distributor`）负责收集已完全处理完的流数据任务的处理数据。其只在云服务器上存在，收集包含具体的处理结果、过程处理时延、调度决策信息等在内的多种数据，
并按需求完成对数据的存储和分发，如将处理结果分发给前后端服务器展示给用户，将处理信息分发给调度器作为调度反馈调整调度决策。

**调度器**（`Scheduler`）负责生成流数据处理的调度决策信息，包括配置决策和卸载决策，其只在云服务器上存在。
具体来说，配置决策指对流数据本身的预处理，如降采样等；卸载决策指对流数据每阶段处理任务的卸载设备的决策。
基于调度器产生的决策信息，大禹调度系统可以对流数据的处理任务执行细粒度的调度切换控制。

**监控器**（`Monitor`）负责监控资源使用情况。监控器在云边分布式集群的每个设备上存在，监控设备内部资源状态，如CPU使用率、内存使用率等；也监控设备间资源状态，如节点间的网络带宽等。

在这些组件中，**生成器**、**控制器**、**分发器**、**调度器**、**监控器**等组件嵌入平台并提供精细的流水线任务组织和调度，它们对用户透明不可见；
同时，**处理器**可以封装应用服务层中用户定义的单阶段或多阶段（流水线）的应用服务，其中每个处理器封装一个阶段的应用服务，一个或多个处理器可以构成完整的应用处理流程。
