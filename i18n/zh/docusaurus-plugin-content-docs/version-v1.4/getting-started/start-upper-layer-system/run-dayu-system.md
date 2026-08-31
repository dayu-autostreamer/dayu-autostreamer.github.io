---
sidebar_label: 运行大禹系统
sidebar_position: 4
slug: /getting-started/start-upper-layer-system/run-dayu-system
---

# 运行大禹系统

## 启动支撑层

在仓库根目录执行：

```bash
TEMPLATE=template ACTION=start bash dayu.sh
```

该命令启动 Backend、Frontend、Datasource 与 Redis，不会安装所选调度策略或应用 DAG。打开脚本输出的 Frontend 地址，
再完成应用安装流程。

停止大禹系统：

```bash
TEMPLATE=template ACTION=stop bash dayu.sh
```

停止命令会先请求 Backend 停止活动查询和应用运行时，再完成支撑层清理。运行时卸载异步执行；在精确删除 RuntimeService 所有对象期间，
前端与 `GET /install_state` 可能显示 cancelling、uninstalling 或 finalizing 等阶段。

## 在前端操作

### 打开首页

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/02-home-page.mp4" type="video/mp4" />
</video>

### 编排任务 DAG

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/03-dag-orchestration.mp4" type="video/mp4" />
</video>

### 配置数据源

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/04-source-configuration.mp4" type="video/mp4" />
</video>

### 安装应用运行时

选择策略、数据源、DAG 与允许节点。Backend 提交活动 `RuntimeDirectory` 之前，页面会保持进行中。
如果安装在创建资源后被取消或失败，请先在同一页面完成清理，再开始下一次安装。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/05-application-installation.mp4" type="video/mp4" />
</video>

### 查看结果可视化

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/06-result-visualization.mp4" type="video/mp4" />
</video>

### 查看系统可视化

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/07-system-visualization.mp4" type="video/mp4" />
</video>
