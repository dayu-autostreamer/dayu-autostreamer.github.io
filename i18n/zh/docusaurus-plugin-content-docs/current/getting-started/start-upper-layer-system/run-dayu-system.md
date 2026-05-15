---
sidebar_label: 运行大禹系统
sidebar_position: 4
slug: /getting-started/start-upper-layer-system/run-dayu-system
---

# 运行大禹系统

本页展示如何启动大禹系统，并通过前端界面完成一次基础工作流。以下视频均为无声录屏，可直接在页面内播放。

## 流程预览

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/01-cover.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>

## 运行启动脚本

大禹系统可以通过仓库提供的 `dayu.sh` 脚本启动和停止：

```bash
cd dayu

# 启动大禹系统
ACTION=start TEMPLATE=template/ bash - dayu.sh

# 停止大禹系统
ACTION=stop TEMPLATE=template/ bash - dayu.sh
```

## 操作前端界面

后端服务启动后，打开大禹前端，并按下面的顺序完成工作流。

### 打开首页

通过首页确认前端可以访问，并查看系统入口。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/02-home-page.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>

### 编排任务 DAG

创建或调整任务 DAG，用于描述数据源、应用和后续处理模块之间的连接关系。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/03-dag-orchestration.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>

### 配置数据源

配置数据源，使大禹能够读取当前工作流所需的输入流或数据集。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/04-source-configuration.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>

### 安装应用

为当前工作流选择并安装所需应用。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/05-application-installation.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>

### 查看结果可视化

打开结果可视化页面，查看应用输出。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/06-result-visualization.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>

### 查看系统可视化

通过系统可视化页面查看运行拓扑和服务状态。

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/07-system-visualization.mp4" type="video/mp4" />
  当前浏览器不支持 video 标签。
</video>
