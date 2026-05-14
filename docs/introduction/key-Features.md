---
sidebar_label: Key Features
sidebar_position: 2
slug: /introduction/key-features
---

# Key Features

Dayu provides the platform pieces needed to build, deploy, schedule, observe, and extend cloud-edge stream analytics workflows. Its features are organized around the full lifecycle of a stream analytics system: application modeling, distributed runtime execution, adaptive scheduling, extensibility, built-in services, and experiment feedback.

## DAG-based AI service pipelines

Dayu models stream analytics applications as DAG-based AI service pipelines. This allows an application to move beyond a simple linear chain and express multi-stage workflows with branching, merging, and different service dependencies.

For example, a video analytics workflow can combine detection, tracking, ROI-level classification, and recognition services in one logical topology. Dayu maps that topology to runtime processors and scheduling decisions, so each logical stage can be deployed and offloaded according to the selected policy.

## Cloud-edge native runtime

Dayu is designed for distributed cloud-edge environments. Its lower-layer system builds on KubeEdge, while Dayu-customized Sedna and EdgeMesh integration supports service deployment and cross-device communication for cloud and edge nodes.

The runtime components are containerized and organized around cloud-edge collaboration. Generators, Controllers, Processors, Monitors, and other services can run across heterogeneous devices, making Dayu suitable for scenarios that combine cloud servers, edge machines, and resource-constrained nodes.

## Adaptive scheduling and offloading

The Scheduler is responsible for runtime decisions such as data configuration, task offloading, initial deployment, source-node selection, and redeployment. These decisions can control parameters such as resolution, FPS, buffer size, encoding behavior, execution devices, and service placement.

Dayu includes a policy catalog for fixed baselines and advanced scheduling families, including Feedback Controlling, Hier-EI variants, Hedger, CASVA, CEVAS, Chameleon, CRAVE, and adaptive model switching. This makes the same platform useful for both repeatable experiments and new scheduling research.

## Hook-driven extensibility

Dayu uses a hook-based runtime extension model. Generator hooks can customize frame filtering, processing, compression, data fetching, and task preparation. Scheduler hooks can customize configuration extraction, policy agents, selection, deployment, and redeployment. Processor hooks can customize service execution, queue behavior, and scenario extraction.

Monitor and visualization hooks extend the feedback side of the system. Because hooks are selected through templates, YAML configuration, and environment variables, new policies and runtime behaviors can reuse the existing service shells instead of forking the whole control flow.

## Built-in AI service catalog

Dayu ships with processor templates and application services for common video analytics tasks, including car, face, pedestrian, and vehicle detection; gender, age, category, and exposure classification; license plate recognition; and model-switch detection.

Several services support detection-plus-tracking or ROI-accelerated classification patterns. Processor templates also expose runtime options such as TensorRT usage and device-specific image builds, which helps Dayu run on heterogeneous cloud-edge hardware including NVIDIA Jetson devices.

## Observability and experiment feedback

Dayu provides result visualization, system visualization, and log export as part of the platform. Result visualizers can render frames, ROI overlays, object counts, delay curves, service processing delay, DAG deployment topology, and DAG offloading topology.

System monitoring covers resource and runtime signals such as CPU usage, memory usage, bandwidth, queue length, model FLOPs, GPU usage, and scheduling overhead. The backend and Distributor can export result logs and system snapshots, giving researchers and operators data for offline analysis and policy comparison.

## Next steps

To understand how these features fit together, read the [architecture overview](/docs/architecture/brief-architecture). To try the system, follow [getting started](/docs/getting-started/preparation). To inspect the implementation, visit the [Dayu GitHub repository](https://github.com/dayu-autostreamer/dayu).
