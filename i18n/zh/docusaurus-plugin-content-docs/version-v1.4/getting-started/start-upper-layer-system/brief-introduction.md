---
sidebar_label: 简要介绍
sidebar_position: 1
slug: /getting-started/start-upper-layer-system/brief-introduction
---

# 启动上层系统

## 简介

大禹系统的上层组件包含两个生命周期范围：

- 支撑层由 Backend、Frontend、Datasource 与 Redis 组成，通过 `dayu.sh` 启动；
- 应用运行时由 Scheduler、Generator、Controller、Processor、Distributor 与 Monitor RuntimeService 组成，
  通过前端或 Backend API 安装。

启动支撑层不会安装调度策略或应用 DAG，因此操作者可以在不重建下层集群的情况下更换或移除应用运行时。

## 启动流程

1. [自定义模板文件](/docs/v1.4/getting-started/start-upper-layer-system/customize-template-files)。
2. [部署挂载文件](/docs/v1.4/getting-started/start-upper-layer-system/deploy-mounted-files)。
3. [运行大禹系统](/docs/v1.4/getting-started/start-upper-layer-system/run-dayu-system)。

启动前请确认下层系统健康，并确保 `template/base.yaml` 中的镜像仓库和挂载路径可以从每个目标节点访问。
