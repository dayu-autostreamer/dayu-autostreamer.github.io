---
sidebar_label: Add Applications
sidebar_position: 3
slug: /developer-guide/how-to-develop/add-applications
---

# Add Applications

In Dayu, an application is usually added as a processor service. A processor service is composed of four parts:

- Python application code in `dependency/core/applications/<application_module>/`
- A processor deployment template in `template/processor/<service-id>.yaml`
- A service entry in `template/services.yaml`
- A Docker image definition in `build/<image-name>.Dockerfile`

The existing applications follow this pattern:

| Application type | Existing examples | Processor selected by `PROCESSOR_NAME` | Python objects exported by application package | Input | Output |
|------------------|-------------------|-----------------------------------------|------------------------------------------------|-------|--------|
| Detection with tracking | `car-detection`, `face-detection`, `pedestrian-detection`, `vehicle-detection` | `detector_tracker_processor` | `Detector`, `Tracker` | `frame` | `bbox` |
| Detection only | `car-detection-pure`, `face-detection-pure`, `model-switch-detection` | `detector_processor` | `Detector` | `frame` | `bbox` |
| Classification | `age-classification`, `gender-classification`, `category-identification`, `exposure-identification`, `license-plate-recognition` | `classifier_processor` | `Classifier` | `bbox` | `text` |
| ROI-aware classification | `age-classification-roi`, `gender-classification-roi`, `category-identification-roi`, `exposure-identification-roi`, `license-plate-recognition-roi` | `roi_classifier_processor` | `Roi_Classifier` | `bbox` | `text` |

The `id`, `input`, and `output` fields decide how the service appears in frontend DAG orchestration. The `service` field decides which image and application package are used at runtime.

## Runtime Convention

When a processor is deployed, Dayu injects `PROCESSOR_SERVICE_NAME=processor-<service>`. The application loader converts the service name from hyphen style to Python module style. For example:

```text
processor-car-detection -> core.applications.car_detection
processor-age-classification -> core.applications.age_classification
```

The imported package must expose the object names required by the selected processor:

```python
# dependency/core/applications/car_detection/__init__.py
from .car_detection import CarDetection as Detector
from .car_tracking import CarTracking as Tracker

__all__ = ["Detector", "Tracker"]
```

The base processors then obtain these objects with `Context.get_instance()`:

```text
detector_processor         -> Detector
detector_tracker_processor -> Detector + Tracker
classifier_processor       -> Classifier
roi_classifier_processor   -> Roi_Classifier
```

Parameters are passed through environment variables named after the object. For example, `DETECTOR_PARAMETERS` is passed to `Detector`, `CLASSIFIER_PARAMETERS` is passed to `Classifier`, and `ROI_CLASSIFIER_PARAMETERS` is passed to `Roi_Classifier`.

## Add Application Code

Create a package under `dependency/core/applications/`. Use underscore style for the Python module name and keep it aligned with the service name:

```text
dependency/core/applications/helmet_detection/
|-- __init__.py
|-- helmet_detection.py
|-- helmet_detection_with_tensorrt/
|-- helmet_detection_without_tensorrt/
`-- requirements.txt
```

A detection application should accept a list of frames and return one result per frame. Existing detection services return:

```python
(result_boxes, result_scores, result_class_ids, result_roi_ids)
```

A minimal detector wrapper looks like this:

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
            # Load TensorRT model here.
            pass
        else:
            # Load PyTorch or another non-TensorRT model here.
            pass

    def infer(self, image: np.ndarray):
        # Return boxes, scores, and class IDs for one frame.
        raise NotImplementedError

    def __call__(self, images: List[np.ndarray]):
        output = []
        for image in images:
            boxes, scores, class_ids = self.infer(image)
            roi_ids = list(range(len(boxes)))
            output.append((boxes, scores, class_ids, roi_ids))
        return output
```

Then export it in `__init__.py`:

```python
from .helmet_detection import HelmetDetection as Detector

__all__ = ["Detector"]
```

If the service uses tracking, also export `Tracker` and select `detector_tracker_processor` in the template. If the service classifies regions from a previous detection result, export `Classifier` and select `classifier_processor`. If it caches classification results by ROI ID, export `Roi_Classifier`, implement `reset_cache()`, and select `roi_classifier_processor`.

## Add Mounted Files

Processor model files are normally mounted under the default file mount prefix configured in `template/base.yaml`:

```yaml
default-file-mount-prefix: "/data/dayu-files"
```

For a processor template with:

```yaml
file-mount:
  - pos: both
    path: "processor/helmet-detection/"
```

Dayu mounts files from `/data/dayu-files/processor/helmet-detection/` on the node where the processor runs. Inside application code, use `Context.get_file_path("model.engine")` or `Context.get_file_path("model.pt")` instead of hard-coding absolute paths.

For the full mounted file structure, see [Deploy Mounted Files](/docs/getting-started/start-upper-layer-system/deploy-mounted-files).

## Add Processor Template

Create `template/processor/helmet-detection.yaml`. A detection-only service can start from this template:

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

Important fields:

| Field | Meaning |
|-------|---------|
| `position` | `cloud`, `edge`, or `both`. Most processor applications use `both` so the scheduler can place them on cloud or edge nodes. |
| `pod-template.image` | Image name. It is expanded with registry, repository, and tag from `template/base.yaml`. |
| `PROCESSOR_NAME` | Selects the base processor implementation. |
| `DETECTOR_PARAMETERS` / `CLASSIFIER_PARAMETERS` / `ROI_CLASSIFIER_PARAMETERS` | Constructor parameters for the exported application object. |
| `SCENARIOS_EXTRACTORS` | Scenario features reported to scheduling policies, such as `obj_num` and `obj_size`. |
| `PRO_QUEUE_NAME` | Processor task queue implementation. Existing services use `simple`. |
| `USE_TENSORRT` | Enables TensorRT model loading in applications that support it. |
| `file-mount.path` | Relative path under `default-file-mount-prefix`. |

## Register the Service

Add the service to `template/services.yaml`:

```yaml
- id: helmet-detection
  service: helmet-detection
  name: helmet detection
  description: helmet detection
  input: frame
  output: bbox
  yaml: helmet-detection.yaml
```

Use these conventions:

- `id` is the DAG node type shown in the frontend. It must be unique.
- `service` is the runtime service name. It should match the image name and Python module after converting hyphens to underscores.
- `input` and `output` must be compatible with adjacent services in a DAG. For example, a detection service usually maps `frame -> bbox`, while a classification service maps `bbox -> text`.
- `yaml` points to a file under `template/processor/`.

Multiple service entries may share the same `service` image and package. For example, `age-classification` and `age-classification-roi` both use `service: age-classification`, but they point to different processor templates.

## Add Dockerfile and Build Registration

Create a Dockerfile under `build/`. Existing processor images copy the shared libraries, the base processor code, the application package requirements, and the common processor entrypoint:

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

Then register the image in `hack/lib/buildx.sh`:

```bash
[helmet-detection]="build/helmet_detection.Dockerfile"
```

Add it to `PLATFORMS`. If the image must be built with JetPack-specific tags such as `v1.3-jp4`, `v1.3-jp5`, and `v1.3-jp6`, also add it to `SPECIAL_TAG_IMAGES`.

Build and push the image:

```bash
make build WHAT=helmet-detection
```

If you use a private registry, set `REG`, `REPO`, and `TAG` before building:

```bash
export REG=repo:5000
export REPO=dayuhub
export TAG=v1.3
make build WHAT=helmet-detection
```

## Check Before Running

Before starting Dayu, check the following:

- `template/services.yaml` contains the new service entry.
- `template/processor/<service-id>.yaml` exists and uses the correct `PROCESSOR_NAME`.
- The application package exports the objects required by `PROCESSOR_NAME`.
- `DETECTOR_PARAMETERS`, `CLASSIFIER_PARAMETERS`, or `ROI_CLASSIFIER_PARAMETERS` match the constructor arguments.
- Mounted files exist on every cloud or edge node that may run the service.
- The image name in the processor template can be pulled from the registry configured in `template/base.yaml`.

After the system starts, open the frontend DAG orchestration page and verify that the new service appears with the expected input and output types.
