---
sidebar_label: 如何开发
sidebar_position: 1
slug: /developer-guide/how-to-develop
---

# 如何开发

大禹系统将运行时生命周期保留在稳定的服务外壳中，并通过模板与 hook 扩展应用、调度、监控、数据源和可视化行为。
开发时应先选择与需求对应的扩展面，避免修改整条请求链路。

## 开发环境

仓库声明 Python 3.8 与 Node.js 20，以便本地校验与 CI 保持一致。只有构建镜像时才需要带 Buildx 的 Docker。

```bash
git clone https://github.com/dayu-autostreamer/dayu.git
cd dayu

make install-python-dev
make frontend-install
make help
```

## 仓库结构

| 路径 | 用途 |
| --- | --- |
| `backend/` | 控制面 API、模板组合、RuntimeService 生命周期、遥测与可视化。 |
| `frontend/` | Vue 操作界面与生命周期状态管理。 |
| `datasource/` | HTTP/RTSP 数据源与基于 manifest 的回放。 |
| `dependency/core/` | 运行时服务、算法、公共契约与应用实现。 |
| `template/` | 策略、服务、组件与可视化配置。 |
| `docker-bake.hcl` 与 `build/` | 镜像矩阵与 Dockerfile。 |
| `docs/` | 面向实现的 API、架构、配置、hook、运维和测试文档。 |
| `tests/` | 单元、集成、组件、端到端、前端与可选 ML 测试。 |

面向代码的入口见仓库内的[快速开始](https://github.com/dayu-autostreamer/dayu/blob/main/docs/repository-quickstart.md)与
[核心概念](https://github.com/dayu-autostreamer/dayu/blob/main/docs/concepts.md)。

## 选择扩展路径

- 添加 AI 服务：参见[添加应用](/docs/developer-guide/how-to-develop/add-applications)。
- 添加调度策略或 hook：参见[自定义调度](/docs/developer-guide/how-to-develop/customize-scheduling)。
- 添加其他运行时 hook：参见 [Hook Functions](/docs/developer-guide/apis/hook-functions)。
- 添加或重命名镜像：更新 `docker-bake.hcl` 与 Dockerfile，并运行 `make validate-build`。
- 修改公共 API 或生命周期：在同一变更中同步更新系统仓库的实现文档与对应站点指南。

## 验证变更

开发过程中运行最小相关测试，提交审阅前再执行聚合检查：

```bash
make validate-build
make test-unit-integration
make frontend-check
make check
```

默认环境不会强制运行依赖 ML 的 Scheduler 与应用测试。相关路径发生变化时，请在具备声明依赖的环境中运行
`make test-python-ml`。测试层次见[测试指南](https://github.com/dayu-autostreamer/dayu/blob/main/docs/testing/README.md)。
