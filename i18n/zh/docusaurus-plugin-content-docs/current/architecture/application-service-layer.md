---
sidebar_label: 应用服务层
sidebar_position: 6
slug: /architecture/application-service-layer
---

# 应用服务层

应用服务层把用户编排的 DAG 转换成可部署的 processor service。每个服务由仓库中的三个位置共同定义：

| 位置 | 作用 |
| --- | --- |
| `template/services.yaml` | DAG 编排界面显示的目录项，包括通用输入和输出形态。 |
| `template/processor/*.yaml` | 运行时镜像、processor 类型、模型参数、队列 hook 与挂载文件。 |
| `dependency/core/applications/*` | 由所选 processor 类型加载的服务本地 AI 实现。 |

服务目录使用 `frame`、`bbox`、`text`、`segmentation`、`track`、`attribute`、`trajectory`、`pose`、`graph`
等 payload 形态标签。大禹系统校验相邻 DAG 节点的形态兼容性，具体应用语义则由用户决定。

## Processor 类型

| Processor | 应用包导出对象 | 典型用途 |
| --- | --- | --- |
| `detector_processor` | `Detector` | 仅检测服务。 |
| `detector_tracker_processor` | `Detector`, `Tracker` | 检测后进行 task-local 跟踪。 |
| `classifier_processor` | `Classifier` | 对上游 bounding box 进行分类。 |
| `roi_classifier_processor` | `Roi_Classifier` | 带 ROI 缓存的分类。 |
| `structured_processor` | `Structured_Processor` | 消费前驱输出或返回更丰富结构化记录的服务。 |

Processor 结果使用统一 content envelope，其中包含 `service`、服务自己的 `outputs` 和精简的 `profile.frame_count`。
Structured application 只返回 `outputs`；processor 负责加载帧、收集当前 DAG 节点的实际前驱结果、校验 record 形态并补充 envelope。

## 结构化交通服务

当前系统提供以下结构化交通服务，并包含可审阅的示例：
[`config/application_dags/driving_risk_perception.dag`](https://github.com/dayu-autostreamer/dayu/blob/main/config/application_dags/driving_risk_perception.dag)。

| 服务 | 输入 | 输出 |
| --- | --- | --- |
| `traffic-detection` | `[frame]` | `[bbox]` |
| `road-context-segmentation` | `[frame]` | `[segmentation]` |
| `traffic-signal-recognition` | `[bbox]` | `[text]` |
| `vehicle-tracking` | `[bbox]` | `[track]` |
| `vehicle-attribute-recognition` | `[bbox]` | `[attribute]` |
| `vehicle-trajectory-prediction` | `[segmentation, track, attribute]` | `[trajectory]` |
| `pedestrian-pose-estimation` | `[bbox]` | `[pose]` |
| `pedestrian-intent-recognition` | `[segmentation, pose]` | `[text]` |
| `risk-graph-generation` | `[segmentation, text, trajectory]` | `[graph]` |

实现与扩展方法见[添加应用](/docs/developer-guide/how-to-develop/add-applications)。服务后端、输出结构、推荐 DAG
和可视化配置的代码对应说明由大禹系统代码仓库中的
[结构化交通服务参考](https://github.com/dayu-autostreamer/dayu/blob/main/docs/configuration/structured-traffic-services.md)维护。
