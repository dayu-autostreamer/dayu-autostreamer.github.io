---
sidebar_label: Application Service Layer
sidebar_position: 6
slug: /architecture/application-service-layer
---

# Application Service Layer

The application service layer turns a user-composed DAG into deployable processor services. Each service is defined
across three repository surfaces:

| Surface | Role |
| --- | --- |
| `template/services.yaml` | Catalog entry shown in DAG orchestration, including generic input and output forms. |
| `template/processor/*.yaml` | Runtime image, processor family, model parameters, queue hook, and mounted files. |
| `dependency/core/applications/*` | Service-local AI implementation loaded by the selected processor family. |

The catalog uses payload-form labels such as `frame`, `bbox`, `text`, `segmentation`, `track`, `attribute`, `trajectory`,
`pose`, and `graph`. Dayu validates form compatibility between adjacent DAG nodes while leaving application semantics to
the user.

## Processor families

| Processor | Application export | Typical use |
| --- | --- | --- |
| `detector_processor` | `Detector` | Detection-only services. |
| `detector_tracker_processor` | `Detector`, `Tracker` | Detection followed by task-local tracking. |
| `classifier_processor` | `Classifier` | Classification of upstream bounding boxes. |
| `roi_classifier_processor` | `Roi_Classifier` | ROI-cached classification. |
| `structured_processor` | `Structured_Processor` | Services that consume predecessor outputs or return richer structured records. |

Processor results use a common content envelope with `service`, service-specific `outputs`, and a compact
`profile.frame_count`. Structured applications return only their `outputs`; the processor loads frames, collects the
actual predecessor results for the current DAG node, validates the record shape, and adds the envelope.

## Structured traffic services

The current system provides a structured traffic family and a reviewable example at
[`config/application_dags/driving_risk_perception.dag`](https://github.com/dayu-autostreamer/dayu/blob/main/config/application_dags/driving_risk_perception.dag).

| Service | Input | Output |
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

For implementation and extension details, see [Add Applications](/docs/developer-guide/how-to-develop/add-applications).
The code-backed service catalog, backend notes, recommended review DAG, and visualization configuration are maintained
in the [Structured Traffic Services reference](https://github.com/dayu-autostreamer/dayu/blob/main/docs/configuration/structured-traffic-services.md).
