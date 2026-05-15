---
sidebar_label: 添加应用
sidebar_position: 3
slug: /developer-guide/how-to-develop/add-applications
---

# 添加应用

在大禹中，应用通常以 processor service 的形式接入。一个 processor service 通常由四部分组成：

- `dependency/core/applications/<application_module>/` 中的 Python 应用代码
- `template/processor/<service-id>.yaml` 中的 processor 部署模板
- `template/services.yaml` 中的服务注册项
- `build/<image-name>.Dockerfile` 中的 Docker 镜像定义

已经实现的应用基本遵循下面的模式：

| 应用类型 | 已有示例 | `PROCESSOR_NAME` 选择的 processor | 应用包需要导出的 Python 对象 | 输入 | 输出 |
|----------|----------|------------------------------------|-------------------------------|------|------|
| 检测 + 跟踪 | `car-detection`, `face-detection`, `pedestrian-detection`, `vehicle-detection` | `detector_tracker_processor` | `Detector`, `Tracker` | `frame` | `bbox` |
| 仅检测 | `car-detection-pure`, `face-detection-pure`, `model-switch-detection` | `detector_processor` | `Detector` | `frame` | `bbox` |
| 分类 | `age-classification`, `gender-classification`, `category-identification`, `exposure-identification`, `license-plate-recognition` | `classifier_processor` | `Classifier` | `bbox` | `text` |
| ROI 感知分类 | `age-classification-roi`, `gender-classification-roi`, `category-identification-roi`, `exposure-identification-roi`, `license-plate-recognition-roi` | `roi_classifier_processor` | `Roi_Classifier` | `bbox` | `text` |

其中，`id`、`input`、`output` 决定服务在前端 DAG 编排中的展示和连接方式；`service` 决定运行时使用的镜像和应用包。

## 运行时约定

processor 部署时，大禹会注入 `PROCESSOR_SERVICE_NAME=processor-<service>`。应用加载器会把 service 名称从连字符格式转换成 Python 模块格式。例如：

```text
processor-car-detection -> core.applications.car_detection
processor-age-classification -> core.applications.age_classification
```

被导入的应用包需要导出所选 processor 需要的对象：

```python
# dependency/core/applications/car_detection/__init__.py
from .car_detection import CarDetection as Detector
from .car_tracking import CarTracking as Tracker

__all__ = ["Detector", "Tracker"]
```

基础 processor 会通过 `Context.get_instance()` 获取这些对象：

```text
detector_processor         -> Detector
detector_tracker_processor -> Detector + Tracker
classifier_processor       -> Classifier
roi_classifier_processor   -> Roi_Classifier
```

对象构造参数通过环境变量传入，环境变量名与对象名对应。例如，`DETECTOR_PARAMETERS` 会传给 `Detector`，`CLASSIFIER_PARAMETERS` 会传给 `Classifier`，`ROI_CLASSIFIER_PARAMETERS` 会传给 `Roi_Classifier`。

## 添加应用代码

在 `dependency/core/applications/` 下创建应用包。Python 模块名使用下划线格式，并与 service 名称保持对应关系：

```text
dependency/core/applications/helmet_detection/
|-- __init__.py
|-- helmet_detection.py
|-- helmet_detection_with_tensorrt/
|-- helmet_detection_without_tensorrt/
`-- requirements.txt
```

检测类应用应接收帧列表，并为每一帧返回一个结果。已有检测服务返回如下结构：

```python
(result_boxes, result_scores, result_class_ids, result_roi_ids)
```

一个最小 detector wrapper 如下：

```python
from typing import List

import numpy as np

from core.lib.common import Context


class HelmetDetection:
    def __init__(self, trt_weights, trt_plugin_library=None, non_trt_weights=None, device=0):
        self.trt_weights = Context.get_file_path(trt_weights)
        self.trt_plugin_library = Context.get_file_path(trt_plugin_library) if trt_plugin_library else None
        self.non_trt_weights = Context.get_file_path(non_trt_weights) if non_trt_weights else None
        self.device = device
        self.flops = 0

        use_tensorrt = Context.get_parameter("USE_TENSORRT", direct=False)
        if use_tensorrt:
            # 在这里加载 TensorRT 模型。
            pass
        else:
            # 在这里加载 PyTorch 或其他非 TensorRT 模型。
            pass

    def infer(self, image: np.ndarray):
        # 返回单帧的 boxes、scores 和 class IDs。
        raise NotImplementedError

    def __call__(self, images: List[np.ndarray]):
        output = []
        for image in images:
            boxes, scores, class_ids = self.infer(image)
            roi_ids = list(range(len(boxes)))
            output.append((boxes, scores, class_ids, roi_ids))
        return output
```

然后在 `__init__.py` 中导出：

```python
from .helmet_detection import HelmetDetection as Detector

__all__ = ["Detector"]
```

如果服务需要跟踪功能，还需要导出 `Tracker`，并在模板中选择 `detector_tracker_processor`。如果服务对上一层检测结果中的区域进行分类，需要导出 `Classifier` 并选择 `classifier_processor`。如果服务按 ROI ID 缓存分类结果，需要导出 `Roi_Classifier`，实现 `reset_cache()`，并选择 `roi_classifier_processor`。

## 添加挂载文件

processor 模型文件通常挂载在 `template/base.yaml` 配置的默认挂载前缀下：

```yaml
default-file-mount-prefix: "/data/dayu-files"
```

如果 processor 模板中配置：

```yaml
file-mount:
  - pos: both
    path: "processor/helmet-detection/"
```

大禹会在运行该 processor 的节点上挂载 `/data/dayu-files/processor/helmet-detection/`。在应用代码中，请使用 `Context.get_file_path("model.engine")` 或 `Context.get_file_path("model.pt")`，不要硬编码绝对路径。

完整的挂载文件结构请参考 [部署挂载文件](/docs/getting-started/start-upper-layer-system/deploy-mounted-files)。

## 添加 Processor 模板

创建 `template/processor/helmet-detection.yaml`。仅检测服务可以从下面的模板开始：

```yaml
position: both
pod-template:
  image: helmet-detection
  imagePullPolicy: Always
  env:
    - name: PROCESSOR_NAME
      value: "detector_processor"
    - name: DETECTOR_PARAMETERS
      value: >
        {
          'trt_weights': 'helmet.engine',
          'trt_plugin_library': 'libmyplugins.so',
          'non_trt_weights': 'helmet.pt',
          'device': 0
        }
    - name: SCENARIOS_EXTRACTORS
      value: >
        ['obj_num', 'obj_size']
    - name: PRO_QUEUE_NAME
      value: "simple"
    - name: USE_TENSORRT
      value: "True"
port-open:
  pos: both
  port: 9000
file-mount:
  - pos: both
    path: "processor/helmet-detection/"
```

关键字段说明如下：

| 字段 | 含义 |
|------|------|
| `position` | `cloud`、`edge` 或 `both`。大多数 processor 应用使用 `both`，让调度器决定部署在云端或边端。 |
| `pod-template.image` | 镜像名，会结合 `template/base.yaml` 中的 registry、repository 和 tag 展开。 |
| `PROCESSOR_NAME` | 选择基础 processor 实现。 |
| `DETECTOR_PARAMETERS` / `CLASSIFIER_PARAMETERS` / `ROI_CLASSIFIER_PARAMETERS` | 传给应用导出对象的构造参数。 |
| `SCENARIOS_EXTRACTORS` | 上报给调度策略的场景特征，例如 `obj_num` 和 `obj_size`。 |
| `PRO_QUEUE_NAME` | processor 任务队列实现。已有服务使用 `simple`。 |
| `USE_TENSORRT` | 对支持 TensorRT 的应用启用 TensorRT 模型加载。 |
| `file-mount.path` | `default-file-mount-prefix` 下的相对路径。 |

## 注册服务

在 `template/services.yaml` 中添加服务：

```yaml
- id: helmet-detection
  service: helmet-detection
  name: helmet detection
  description: helmet detection
  input: frame
  output: bbox
  yaml: helmet-detection.yaml
```

约定如下：

- `id` 是前端 DAG 中显示的节点类型，必须唯一。
- `service` 是运行时服务名，应与镜像名保持一致，并能通过连字符转下划线对应到 Python 应用包。
- `input` 和 `output` 必须能与 DAG 中相邻服务匹配。例如，检测服务通常是 `frame -> bbox`，分类服务通常是 `bbox -> text`。
- `yaml` 指向 `template/processor/` 下的模板文件。

多个服务项可以共用同一个 `service` 镜像和应用包。例如，`age-classification` 和 `age-classification-roi` 都使用 `service: age-classification`，但它们指向不同的 processor 模板。

## 添加 Dockerfile 和构建注册

在 `build/` 下创建 Dockerfile。已有 processor 镜像会复制共享库、processor 基础代码、应用包依赖和通用 processor 入口：

```dockerfile
ARG REG=docker.io
ARG TAG=latest
FROM ${REG}/dayuhub/dayubase:${TAG}

ARG dependency_dir=dependency
ARG lib_dir=dependency/core/lib
ARG base_dir=dependency/core/processor
ARG code_dir=components/processor
ARG app_dir=dependency/core/applications/helmet_detection

ENV TZ=Asia/Shanghai

COPY ${lib_dir}/requirements.txt ./lib_requirements.txt
COPY ${base_dir}/requirements.txt ./base_requirements.txt
COPY ${app_dir}/requirements.txt ./app_requirements.txt

RUN pip3 install --upgrade pip && \
    pip3 install -r lib_requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip3 install -r base_requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip3 install -r app_requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

COPY ${dependency_dir} /home/dependency
ENV PYTHONPATH="/home/dependency"

WORKDIR /app
COPY ${code_dir}/* /app/

CMD ["python3", "-m", "gunicorn", "main:app", "-c", "./gunicorn.conf.py"]
```

然后在 `hack/lib/buildx.sh` 中注册镜像：

```bash
[helmet-detection]="build/helmet_detection.Dockerfile"
```

同时将其加入 `PLATFORMS`。如果该镜像需要构建 `v1.3-jp4`、`v1.3-jp5`、`v1.3-jp6` 这类 JetPack 特定标签，也要加入 `SPECIAL_TAG_IMAGES`。

构建并推送镜像：

```bash
make build WHAT=helmet-detection
```

如果使用私有镜像仓库，请在构建前设置 `REG`、`REPO` 和 `TAG`：

```bash
export REG=repo:5000
export REPO=dayuhub
export TAG=v1.3
make build WHAT=helmet-detection
```

## 运行前检查

启动大禹之前，请检查下面几项：

- `template/services.yaml` 中包含新的服务注册项。
- `template/processor/<service-id>.yaml` 存在，并使用正确的 `PROCESSOR_NAME`。
- 应用包导出了 `PROCESSOR_NAME` 所需的对象。
- `DETECTOR_PARAMETERS`、`CLASSIFIER_PARAMETERS` 或 `ROI_CLASSIFIER_PARAMETERS` 与构造函数参数一致。
- 所有可能运行该服务的云端或边端节点上都存在需要挂载的模型文件。
- processor 模板中的镜像名可以从 `template/base.yaml` 配置的镜像仓库中拉取。

系统启动后，打开前端 DAG 编排页面，确认新服务以预期的输入和输出类型出现。
