---
sidebar_label: Why Dayu
sidebar_position: 1
slug: /
---

# Why Dayu

Dayu is a cloud-edge stream analytics platform for deploying, scheduling, and operating DAG-based AI pipelines across heterogeneous nodes. It brings together a backend control plane, a Vue frontend, simulated data sources, and a runtime collaboration layer for Generator, Scheduler, Controller, Processor, Distributor, and Monitor services.

The goal of Dayu is to make cloud-edge video and stream analytics easier to build, compare, and operate. Instead of binding one model, one pipeline, and one deployment script together, Dayu separates application logic, runtime scheduling, system monitoring, and deployment composition into reusable platform layers.

![Dayu architecture](/img/architecture/arch.svg)

## Why cloud-edge stream analytics needs Dayu

Modern stream analytics applications are rarely single-model demos. A practical video analytics workflow may start with object detection, branch into tracking and classification, merge downstream recognition results, and continuously adjust how much data is processed at the edge or in the cloud.

This makes the runtime problem difficult:

- **Multiple data streams** need to be processed continuously, often from different cameras or sources.
- **Heterogeneous nodes** have different CPU, GPU, memory, network, and model-serving capabilities.
- **Dynamic workloads** change with scene content, bandwidth, queue pressure, and user-defined quality goals.
- **Multi-stage AI pipelines** need fine-grained control over where each stage runs and how tasks move between stages.
- **System experiments** require reproducible policies, comparable baselines, runtime telemetry, result visualization, and logs.

Dayu addresses these problems as a platform instead of leaving every application to rebuild the same control and scheduling machinery.

## The Dayu approach

Dayu follows a five-layer architecture. The lower-layer system builds on KubeEdge and Dayu-customized Sedna and EdgeMesh integration to support container orchestration, service deployment, and cross-node communication. The upper-layer system provides the control plane, runtime collaboration components, scheduling logic, application services, and visualization feedback loop.

At runtime, Dayu turns a user-defined service DAG into coordinated stream processing tasks. Generators create tasks from data sources, the Scheduler produces data-configuration and offloading decisions, Controllers forward tasks across devices and processors, Processors run AI services, the Distributor stores completed results, and Monitors feed resource status back into scheduling.

This structure lets Dayu support both stable end-to-end workflows and research-oriented scheduling policies. Developers can compare fixed baselines, feedback control, hierarchical embodied intelligence, adaptive video encoding, model switching, and topology-aware policies under the same runtime structure.

## Who Dayu is for

Dayu is designed for researchers and developers who need more than a standalone inference demo. It is useful when you want to prototype cloud-edge AI pipelines, evaluate scheduling and offloading policies, test multi-stream video analytics scenarios, or build new runtime extensions on top of an existing orchestration framework.

If you are new to Dayu, start with the [architecture overview](/docs/architecture/brief-architecture), then follow the [getting started guide](/docs/getting-started/preparation). The system implementation is available in the [Dayu GitHub repository](https://github.com/dayu-autostreamer/dayu).
