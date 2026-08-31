---
sidebar_label: Hook Functions
sidebar_position: 1
slug: /developer-guide/apis/hook-functions
---

# Hook Functions

大禹系统使用基于 registry 的 hook 机制，使策略与应用行为可以变化，而无需替换稳定的运行时服务循环。
实现通过 `ClassFactory` 注册 alias，模板与可视化配置在运行时选择该 alias。

## 解析模型

| 部分 | 作用 |
| --- | --- |
| `ClassFactory` | 在一个 `ClassType` 下注册实现及其 alias。 |
| `Context.get_algorithm()` | 读取所选名称与参数并创建 hook 实例。 |
| `dependency/core/lib/algorithms/__init__.py` | 导入各 hook family 包，在 core 初始化时启动发现。 |
| 公共 hook loader | 从 `dependency/core/lib/algorithms/loader.py` 导入公开的单文件 hook 与显式 package 入口。 |
| 模板与 YAML 目录 | 通过 `<TYPE>_NAME`、`<TYPE>_PARAMETERS`、列表或 `hook_name` 选择 alias。 |

大多数单 hook 使用如下形式：

```yaml
- name: GEN_FILTER_NAME
  value: simple
- name: GEN_COMPRESS_NAME
  value: simple
```

Processor scenario extractor 与 Monitor metric 使用 alias 列表，结果和系统可视化则为每个可视化条目选择一个 `hook_name`。

## Package 发现

每个 hook family 只检查其直接子项。公开的 `.py` 文件作为单文件 hook 入口导入；多文件实现必须提供
`<package>/hook.py`，由该入口显式导入已注册实现并通过 `__all__` 暴露。内部 model、DRL、utility 与
ablation 模块不会递归发现，package 的 `__init__.py` 应保持轻量。

声明可选依赖的 hook family 仅在外部依赖不可用时跳过对应入口并给出警告；缺失 `core.*` 模块仍会立即报错，
避免把仓库内部错误误判为可选功能。

## 主要 hook 组

| 范围 | 示例 |
| --- | --- |
| Generator | Getter filter、frame filter/process/compress、before-schedule、after-schedule、getter 与 before-submit。 |
| Scheduler | 配置提取、scenario/policy retrieval、startup、数据源选择、部署、重新部署与 agent。 |
| Processor | Processor 类型、队列策略与 scenario extraction。 |
| Monitor | 资源与 queue-state 采集。 |
| Visualization | 由 YAML 选择的结果和系统可视化。 |

## 添加实现

1. 实现调用方使用的 base signature。
2. 自包含 hook 使用公开的 `.py` 文件；多文件实现或一组相关变体使用带 `hook.py` 的 package。
3. 使用 `@ClassFactory.register(ClassType.<TYPE>, alias="<name>")` 注册每个类，并通过入口模块的
   `__all__` 暴露。
4. 在 `hook.py` 中显式导入 package 内部模块，不依赖递归发现或 package 的 eager import。
5. 在模板、列表或可视化配置中暴露 alias。
6. 记录构造参数与可选依赖，并添加聚焦测试、更新 hook 目录。

调用顺序本身也是运行时契约，尤其是 Generator identity reservation 与 Scheduler 部署校验。
添加 alias 前请查阅实现向 [Hook Guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/README.md) 与
[Hook Catalog](https://github.com/dayu-autostreamer/dayu/blob/main/docs/hooks/catalog.md)。
