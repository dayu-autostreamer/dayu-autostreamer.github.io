---
sidebar_label: 系统支撑层
sidebar_position: 4
slug: /architecture/system-support-layer
---

# 系统支撑层

系统支撑层向操作者提供大禹系统工作流，并在安装应用运行时之前提供必要的基础服务。

| 服务 | 职责 |
| --- | --- |
| [Frontend](https://github.com/dayu-autostreamer/dayu/tree/main/frontend) | 基于 Vue 的 UI，用于 DAG、数据源、安装、查询控制、可视化与日志导出。 |
| [Backend](https://github.com/dayu-autostreamer/dayu/tree/main/backend) | 控制面 API、模板组合、唯一的 Kubernetes 访问、RuntimeService 生命周期、遥测缓存与可视化渲染。 |
| [Datasource](https://github.com/dayu-autostreamer/dayu/tree/main/datasource) | 可选的 HTTP/RTSP 模拟源与基于 manifest 的视频回放。 |
| Redis | 持久化 Scheduler 的活动 RuntimeDirectory、proposal、task reservation 与 lease。 |

支撑层和应用运行时具有独立生命周期。`ACTION=start` 会使 Frontend 与 Backend 可用，但不会选择 DAG 或创建应用 worker；
该事务由 `POST /install` 完成。类似地，`POST /stop_service` 异步移除应用运行时，而 `ACTION=stop` 负责最终清理支撑层。

一个大禹系统 namespace 对应一个共享生命周期域。连接到同一 Backend 的所有前端窗口都会观察到相同的安装和查询状态。
前端本地保存的表单草稿只用于操作便利，Backend 的 `/install_state` 与 `/query_state` 才是权威状态。
