---
sidebar_label: API 参考
sidebar_position: 2
slug: /developer-guide/apis/api-doc
---

# API 参考

大禹系统将路由级 API 文档与实现一起维护在
[dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu) 仓库中。本页概括可集成的接口范围，并链接到
这些紧邻代码的参考文档。

| 参考文档 | 范围 |
| --- | --- |
| [Backend API](https://github.com/dayu-autostreamer/dayu/blob/main/docs/api/backend.md) | 面向 operator 的目录、配置、安装、查询、遥测、可视化和日志接口。 |
| [Runtime Service APIs](https://github.com/dayu-autostreamer/dayu/blob/main/docs/api/runtime-services.md) | Scheduler、Generator、Controller、Processor、Distributor、Monitor 与 datasource service 之间的内部契约。 |
| [API 章节索引](https://github.com/dayu-autostreamer/dayu/blob/main/docs/api/README.md) | Service map、传输约定和稳定性说明。 |

## Backend API 分组

Backend 是大禹系统 Frontend 和运维集成使用的公共控制面入口。

| 范围 | 主要端点 |
| --- | --- |
| 目录与拓扑 | `GET /policy`、`GET /service`、`GET /installed_service`、`GET /service_info/{service}`、`GET /edge_node` |
| DAG 与 datasource 配置 | `GET/POST/DELETE /dag_workflow`、`GET/POST/DELETE /datasource` |
| 运行时生命周期 | `POST /install`、`GET /install_state`、`POST /stop_service` |
| 查询生命周期 | `POST /submit_query`、`POST /stop_query`、`GET /query_state`、`GET /source_list`、`GET /datasource_state`、`POST /reset_datasource` |
| 结果与遥测 | `GET /task_result`、`GET /system_parameters` |
| 可视化与日志 | 结果/系统可视化配置端点、`GET /download_log` 和 `GET /download_system_log` |

## 生命周期语义

- `POST /install` 返回成功只表示请求已被接受，不能单独证明运行时已经就绪。应轮询
  `GET /install_state`，仅在 `ready=true` 后开始读取运行时信息。
- `POST /stop_service` 是异步操作。提交观察到的 `install_id` 后继续轮询 `GET /install_state`，直到该目标
  id 消失；请求被接受不代表卸载完成。
- 一个 Backend namespace 是一个共享管理域。大禹系统不内置 HTTP 身份认证或用户隔离；生产部署应在 ingress
  或 gateway 处保护 Frontend 与 Backend。
- `install_id` 是防止延迟请求影响替代安装的生命周期前置条件，不是身份认证令牌。
- 初始部署与重新部署响应定义完整的 Processor 期望拓扑。Backend 会校验并原样生成该计划，不追加云端或边缘副本。

完整请求/响应结构、安装状态机和遥测状态值见上方 Backend API 参考文档。

## Runtime service API

Runtime 路由是大禹系统内部契约，不是通用集成 API。组件交换序列化的 `Task` payload，在需要时通过
`multipart/form-data` 传输二进制任务数据，并使用精确 task UUID 确认所有权转移。Runtime worker 按 task
携带的路由执行，不自行发现 Kubernetes 对象。

修改内部路由时，应在同一变更中同步更新服务端、仓库内所有调用方和 runtime API 文档。结构化 processor
输出 envelope 属于应用开发契约，而不是独立的 route-level API；通用契约见
[添加应用](/docs/developer-guide/how-to-develop/add-applications)，具体服务实现由大禹系统代码仓库中的
[结构化交通服务参考](https://github.com/dayu-autostreamer/dayu/blob/main/docs/configuration/structured-traffic-services.md)维护。
