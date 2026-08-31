---
sidebar_label: Basic System Layer
sidebar_position: 2
slug: /architecture/basic-system-layer
---

# Basic System Layer

The basic system layer provides the cluster, networking, and container runtime on which Dayu runs. Kubernetes manages
the cloud control plane, while [KubeEdge](https://kubeedge.io/) extends workload and device management to edge nodes.

| Component | Role in a Dayu deployment |
| --- | --- |
| Kubernetes control plane | Stores cluster resources and schedules cloud workloads. |
| KubeEdge CloudCore | Connects the Kubernetes control plane to edge nodes. |
| KubeEdge EdgeCore | Runs on each edge node and maintains its cloud connection and local workloads. |
| Container runtime and cluster network | Pull images, start containers, and provide pod/service connectivity. |

Dayu keeps Kubernetes access inside Backend. Generator, Controller, Processor, Distributor, Scheduler, and Monitor
use Dayu runtime contracts and exact published routes instead of querying the cluster. This application boundary still
depends on a healthy Kubernetes/KubeEdge foundation and on the matching Sedna and EdgeMesh extensions described in the
next layer.

![Kubernetes and KubeEdge lower-layer structure](/img/architecture/lower-layer-structure.png)
