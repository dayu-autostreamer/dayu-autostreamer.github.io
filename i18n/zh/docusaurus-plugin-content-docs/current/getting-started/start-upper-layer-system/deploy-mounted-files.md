---
sidebar_label: 部署挂载文件
sidebar_position: 3
slug: /getting-started/start-upper-layer-system/deploy-mounted-files
---

# 部署挂载文件

大禹系统需要部署文件以支持组件容器的挂载。

从 [挂载文件链接](https://box.nju.edu.cn/d/300d99fd77b049908606)下载文件，它具有以下结构：

```text
dayu-deploy-files/
|-- cloud-deploy-files/
|   `-- dayu-files/
|       |-- acc-gt-dense/
|       |   |-- car-detection/
|       |   `-- face-detection/
|       |-- acc-gt-sparse/
|       |   |-- car-detection/
|       |   `-- face-detection/
|       |-- processor/
|       |   |-- age-classification/
|       |   |-- car-detection/
|       |   |-- category-identification/
|       |   |-- exposure-identification/
|       |   |-- face-detection/
|       |   |-- gender-classification/
|       |   |-- license-plate-recognition/
|       |   |-- model-switch-detection/
|       |   |-- pedestrian-detection/
|       |   `-- vehicle-detection/
|       `-- scheduler/
|           `-- fixed/
|-- datasource-deploy-files/
|   `-- datasource/
|       `-- video/
|           |-- road_0/
|           |-- road_1/
|           |-- road_dense/
|           |-- road_sparse/
|           |-- street_0/
|           |-- street_dense/
|           `-- street_sparse/
|-- edge-deploy-files/
|   `-- dayu-files/
|       |-- generator/
|       |   `-- adaptive/
|       `-- processor/
|           |-- age-classification/
|           |-- car-detection/
|           |-- category-identification/
|           |-- exposure-identification/
|           |-- face-detection/
|           |-- gender-classification/
|           |-- license-plate-recognition/
|           |-- model-switch-detection/
|           |-- pedestrian-detection/
|           `-- vehicle-detection/
`-- tensorrt-application-files/
    |-- age-classification/
    |-- car-detection/
    |-- category-identification/
    |-- exposure-identification/
    |-- face-detection/
    |-- gender-classification/
    |-- license-plate-recognition/
    |-- pedestrian-detection/
    `-- vehicle-detection/
```

## 部署到节点

默认挂载路径在 `template/base.yaml` 中配置：

```yaml
default-file-mount-prefix: "/data/dayu-files"
datasource:
  data-root: "/data/datasource/"
```

如果保持默认配置，请按下表部署下载得到的文件：

| 下载目录                                      | 目标节点                                  | 目标路径            | 用途                                                       |
|-----------------------------------------------|-------------------------------------------|---------------------|------------------------------------------------------------|
| `cloud-deploy-files/dayu-files/`              | 云端节点                                  | `/data/dayu-files/` | 云端 processor 与 scheduler 挂载的文件。                  |
| `edge-deploy-files/dayu-files/`               | 可能运行大禹组件的每个边端节点            | `/data/dayu-files/` | 边端 processor 与 generator 挂载的文件。                  |
| `datasource-deploy-files/datasource/`         | `datasource.node` 配置的边端节点          | `/data/datasource/` | 启用仿真数据源时使用的视频文件。                           |
| `tensorrt-application-files/<application>/`   | 云端与边端节点的可选来源文件              | 见下文              | 替换模型文件时使用的不同平台 TensorRT engine 文件。        |

例如，在默认路径下，processor 模板中的 `processor/car-detection/` 会被解析为运行该 processor 的节点上的
`/data/dayu-files/processor/car-detection/`。如果某个模板使用 `position: both`，请确保云端和边端节点上都存在
对应目录。

## TensorRT 应用文件

`cloud-deploy-files` 和 `edge-deploy-files` 已经包含默认云端和边端部署所需的模型文件。
`tensorrt-application-files` 用于为不同硬件平台替换或准备 TensorRT engine 文件。每个应用目录按平台组织：

```text
tensorrt-application-files/<application>/
|-- cloud/
|-- jp4-tx2/
|-- jp4-xavier-nx/
|-- jp5-agx-xavier/
`-- jp6-orin-nano/
```

选择与目标节点匹配的平台目录，再将其中的 engine 文件复制到 `/data/dayu-files/processor/` 下同名应用目录中。
例如，`car-detection` 的云端文件应放在云端节点的 `/data/dayu-files/processor/car-detection/`，JetPack 4 TX2
文件应放在对应 TX2 边端节点的相同相对路径下。

如果修改了 `template/base.yaml` 中的 `default-file-mount-prefix` 或 `datasource.data-root`，请将文件部署到修改后的
路径，而不是上面的默认路径。
