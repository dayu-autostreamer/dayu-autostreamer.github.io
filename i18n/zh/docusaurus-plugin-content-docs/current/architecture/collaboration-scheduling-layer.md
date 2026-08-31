---
sidebar_label: 协同调度层
sidebar_position: 5
slug: /architecture/collaboration-scheduling-layer
---

# 协同调度层

协同调度层按照选定的服务 DAG 执行流式任务，由六类运行时组件组成。

![Upper-layer structure](/img/architecture/upper-layer-structure.png)

| 组件 | 职责 |
| --- | --- |
| [Generator](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/generator) | 读取选定数据源，预留 task identity，在需要时请求调度，生成源数据并提交任务。 |
| [Scheduler](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/scheduler) | 维护策略状态、数据源与部署计划、资源快照、任务准入、lease 和带版本的 RuntimeDirectory。 |
| [Controller](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/controller) | 沿 DAG 转发任务，协调分支与汇合，并在释放下一跳 payload 前要求确认。 |
| [Processor](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/processor) | 执行一个逻辑 AI 服务，管理本地任务队列并返回归一化服务输出。 |
| [Distributor](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/distributor) | 持久化完成任务，提供增量结果与文件，导出日志并释放最终 task lease。 |
| [Monitor](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/monitor) | 采集资源与结构化 queue state 并上报 Scheduler。 |

Processor 副本只会创建在完整且已校验的部署计划所返回的节点上。部署策略必须显式包含所需的边缘或云端副本；
Backend 不会在校验后追加副本。Backend 会创建该计划所需的 Controller 和 Monitor 路由，并在激活完成后一次性发布完整路由集。

每个调度决策都包含 directory revision 与精确运行时路由。Generator 把这份 commitment 复制到任务，Controller 和 Processor
不进行集群发现。processor 滚动更新期间，新任务使用新 revision；旧任务则在 lease 完成或 retirement grace 到期前继续使用其不可变旧路由。

调度行为仍可通过配置提取、策略 agent、数据源选择、初始部署与重新部署等 hook family 扩展。参见
[自定义调度](/docs/developer-guide/how-to-develop/customize-scheduling)。
