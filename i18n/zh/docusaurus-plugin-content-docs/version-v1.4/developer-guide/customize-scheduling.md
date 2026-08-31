---
sidebar_label: 自定义调度
sidebar_position: 4
slug: /developer-guide/how-to-develop/customize-scheduling
---

# 自定义调度

一个可安装的大禹系统调度策略由三个位置共同组成：

1. `dependency/core/lib/algorithms/` 下已注册的 hook 实现；
2. `template/scheduler/` 下选择 alias 和参数的 Scheduler 模板；
3. `template/scheduler_policies.yaml` 中选择 Scheduler 及其 Generator、Controller、Distributor、Monitor
   依赖模板的安装目录项。

## Scheduler hook 类型

| Hook | 职责 |
| --- | --- |
| `SCH_CONFIG_EXTRACTION` | 加载策略配置空间与挂载资产。 |
| `SCH_SCENARIO_RETRIEVAL` | 把完成任务转换为策略状态。 |
| `SCH_POLICY_RETRIEVAL` | 恢复任务所应用的策略。 |
| `SCH_STARTUP_POLICY` | 在 agent 状态不足时提供安全调度结果。 |
| `SCH_SELECTION_POLICY` | 从 Backend 授权候选集中选择一个数据源节点。 |
| `SCH_INITIAL_DEPLOYMENT_POLICY` | 返回第一份完整 processor 部署计划。 |
| `SCH_REDEPLOYMENT_POLICY` | 返回后续完整 processor 部署计划。 |
| `SCH_AGENT` | 维护每个数据源的状态并生成 task schedule decision。 |

## 当前调度契约

- 数据源选择只能使用 Backend 提供的候选 scope，不应自行发现集群拓扑。
- 初始部署与重新部署必须为当前 DAG 返回完整的 `logical service -> [node hostname, ...]` 映射。
  未知服务、空部署位置和候选集外节点会校验失败。
- `BaseAgent` 会结合当前请求与注入的云端身份校验部署计划。
- Scheduler 校验后的结果就是完整的 Processor 期望拓扑。Backend 会原样生成该计划，不再追加副本。
  策略可通过 `cloud`、`full`、`source-edge-cloud`、fixed 的 `@cloud` 目标或 `include_cloud`
  显式选择云端部署；`full-edge` 仅部署到边缘。
- 运行时路由不是策略输出。Scheduler 与 Backend 在策略结果通过校验后附加已提交的 RuntimeDirectory revision 与精确路由。
- 即时卸载决策应读取 `LIVE` 调度快照，并且只选择该 revision 中已激活的副本。面向未来状态的 commitment-aware
  规划应读取 `COMMITTED`，其中还包含 reservation、active commitment 与 task barrier。遥测数据必须与所用
  RuntimeDirectory revision 一致。
- 仅线性 pipeline 策略可使用公共的边缘到云端 partition helper。通用 DAG 策略必须保留完整图结构；对于不支持的
  分支、汇合、环、非活动目标，应明确拒绝，不能静默线性化。
- 调度 agent 不应修改复制出的快照或其他框架共享状态。

## 添加策略

1. 从最接近的现有 hook 与模板 family 开始。
2. 自包含 hook 使用公开的 `.py` 入口；策略包含 helper、model 或相关变体时，使用带 `hook.py` 的算法 package。
3. 使用 `@ClassFactory.register(ClassType.<TYPE>, alias="<name>")` 注册每个类，通过 `__all__`
   暴露，并在 `hook.py` 中显式导入 package 内部模块。
4. 通过 Scheduler 模板中对应的 `<TYPE>_PARAMETERS` 传入构造参数。
5. 把策略资产放在明确的挂载路径下，并说明是否需要可选 ML 依赖。
6. 在 `template/scheduler_policies.yaml` 中添加唯一 policy ID，并按照数据源与监控需求选择组件依赖。
7. 为 alias 加载、请求校验、调度输出、部署计划校验与 fallback 行为添加聚焦测试。
8. 在依赖可用时运行 `make validate-build`、相关 Python 测试与 `make check`。

不要在策略中加入 Kubernetes client 或路由查询代码。Backend 负责集群访问，Scheduler 负责路由发布，运行时任务携带精确路由 commitment。

完整 alias 目录与调用签名维护在系统仓库：
[Hook Guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/README.md) 与
[Hook Catalog](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/catalog.md)。
