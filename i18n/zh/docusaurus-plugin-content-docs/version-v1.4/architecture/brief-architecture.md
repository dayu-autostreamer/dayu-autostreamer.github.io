---
sidebar_label: 架构总览
sidebar_position: 1
slug: /architecture/brief-architecture
---

# 架构总览

大禹系统采用五层架构。**基础系统层**与**中间接口层**构成下层平台，负责集群编排、运行时部署与跨节点通信；
**系统支撑层**、**协同调度层**与**应用服务层**构成用户配置和操作的上层系统。

![大禹系统架构](/img/architecture/arch.svg)

## 运行流程

1. 操作者启动支撑服务，并选择数据源、DAG、调度策略与目标节点。
2. 大禹系统在云端和边缘节点部署应用所需的运行时服务，并确认应用运行时已经就绪。
3. 流数据转换为任务，并根据调度决策沿 DAG 依次执行。
4. 受控的运行时更新可以调整执行位置，同时保证在途任务一致完成。
5. 运行结果与系统状态被汇总，用于可视化、分析和进一步的策略评估。

## 各层职责

- **[基础系统层](/docs/v1.4/architecture/basic-system-layer)** 提供覆盖云端与边缘节点的集群基础设施。
- **[中间接口层](/docs/v1.4/architecture/intermediate-interface-layer)** 提供运行时部署与跨节点服务通信能力。
- **[系统支撑层](/docs/v1.4/architecture/system-support-layer)** 提供用户界面、系统控制、数据源管理与平台状态维护。
- **[协同调度层](/docs/v1.4/architecture/collaboration-scheduling-layer)** 协调任务生成、调度、执行、结果交付与资源观测。
- **[应用服务层](/docs/v1.4/architecture/application-service-layer)** 通过通用接口和模板提供用户可组合的 AI 服务。

实现级生命周期和 API 细节见[仓库文档](https://github.com/dayu-autostreamer/dayu/tree/main/docs)。
