---
sidebar_label: 自定义模板文件
sidebar_position: 2
slug: /getting-started/start-upper-layer-system/customize-template-files
---

# 自定义模板文件

大禹系统使用 `template/` 下的 YAML 文件组合每次安装。在云端节点克隆系统仓库，并为目标部署编辑该目录的副本：

```bash
git clone https://github.com/dayu-autostreamer/dayu.git
cd dayu/template
```

主要结构如下：

```text
template/
├── base.yaml
├── scheduler_policies.yaml
├── services.yaml
├── result-visualizations.yaml
├── system-visualizations.yaml
├── scheduler/
├── processor/
├── generator/
├── controller/
├── distributor/
└── monitor/
```

## 目录与系统文件

| 文件 | 用途 | 参考 |
| --- | --- | --- |
| `base.yaml` | Namespace、Backend RBAC、运行时超时、镜像、挂载、数据源模式和目录导入。 | [基础模板](/docs/v1.4/getting-started/start-upper-layer-system/base-template) |
| `scheduler_policies.yaml` | 可安装策略目录及每个策略依赖的组件模板。 | [调度策略](/docs/v1.4/getting-started/start-upper-layer-system/scheduler-policies-template) |
| `services.yaml` | DAG 服务目录与 processor 模板映射。 | [服务](/docs/v1.4/getting-started/start-upper-layer-system/services-template) |
| `result-visualizations.yaml` | 任务结果可视化模块。 | [结果可视化](/docs/v1.4/getting-started/start-upper-layer-system/result-visualizations-template) |
| `system-visualizations.yaml` | 运行时和资源可视化模块。 | [系统可视化](/docs/v1.4/getting-started/start-upper-layer-system/system-visualizations-template) |

## 组件模板

`scheduler/`、`processor/`、`generator/`、`controller/`、`distributor/` 与 `monitor/` 下的文件是逻辑组件模板。
Backend 将所选策略、DAG、数据源、节点、镜像默认值和挂载文件组合后，渲染为不可变的 Sedna `RuntimeService`。
这些模板不再被转换成一个应用级 `JointMultiEdgeService`。

| 模板 | 作用 | 参考 |
| --- | --- | --- |
| 通用字段 | 位置、镜像、环境变量、端口、云/边 overlay 与 host-path 挂载。 | [通用模板](/docs/v1.4/getting-started/start-upper-layer-system/common-template) |
| `scheduler/*.yaml` | Scheduler hook 选择与策略参数。 | [Scheduler 模板](/docs/v1.4/getting-started/start-upper-layer-system/scheduler-template) |
| `processor/*.yaml` | AI 服务镜像、processor 类型、队列、模型参数与文件。 | [Processor 模板](/docs/v1.4/getting-started/start-upper-layer-system/processor-template) |
| `generator/*.yaml` | 数据源处理与调度请求 hook。 | [Generator 模板](/docs/v1.4/getting-started/start-upper-layer-system/generator-template) |
| `controller/*.yaml` | 任务转发行为。 | [Controller 模板](/docs/v1.4/getting-started/start-upper-layer-system/controller-template) |
| `distributor/*.yaml` | 结果持久化与导出服务。 | [Distributor 模板](/docs/v1.4/getting-started/start-upper-layer-system/distributor-template) |
| `monitor/*.yaml` | 资源与 queue-state monitor 集合。 | [Monitor 模板](/docs/v1.4/getting-started/start-upper-layer-system/monitor-template) |

Backend 会在路由发布前校验目录引用、节点权限、部署计划、端口、挂载和最终环境变量。
策略专用模型或 profile 资产应放在模板所要求的挂载路径中。
