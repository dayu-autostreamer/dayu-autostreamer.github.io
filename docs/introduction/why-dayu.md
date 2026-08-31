---
sidebar_label: Why Dayu
sidebar_position: 1
slug: /
---

# Why Dayu

Dayu is a cloud-edge stream analytics platform for deploying, scheduling, and operating DAG-based AI pipelines across
heterogeneous nodes. It provides an integrated environment for composing application workflows, managing data sources,
coordinating cloud-edge execution, and observing runtime behavior.

The goal of Dayu is to make cloud-edge video and stream analytics easier to build, compare, and operate. Instead of binding one model, one pipeline, and one deployment script together, Dayu separates application logic, runtime scheduling, system monitoring, and deployment composition into reusable platform layers.

![Dayu architecture](/img/architecture/arch.svg)

## Why cloud-edge stream analytics needs Dayu

Production stream analytics rarely consists of one model on one machine. A workflow may branch from detection into
tracking and classification, merge downstream results, and continuously adapt its data configuration and execution
placement. This introduces several recurring problems:

- multiple sources must be processed continuously and independently;
- cloud and edge nodes have different compute, memory, network, and model-serving capabilities;
- workload, bandwidth, and queue pressure change at runtime;
- multi-stage pipelines require coordinated placement, routing, and task ownership;
- experiments need repeatable policies, telemetry, visualizations, and exportable results.

Dayu provides these capabilities as reusable infrastructure instead of coupling each application to a separate
deployment and scheduling stack.

## The Dayu approach

Dayu separates the system into five layers. Kubernetes and KubeEdge provide the cluster substrate; Dayu-customized Sedna
and EdgeMesh provide runtime deployment and cross-node service communication; the upper layers provide the control
plane, scheduling runtime, application services, and visualization feedback loop.

Dayu turns a user-defined DAG and scheduling policy into a managed cloud-edge runtime. It coordinates service
deployment and task routing, keeps in-flight work consistent when execution placement changes, and feeds results and
runtime telemetry back into visualization and policy evaluation.

This design supports both stable application workflows and research-oriented scheduling. Policies and application
logic are selected through catalogs, templates, and hooks, so developers can extend one part of the system without
forking the complete runtime lifecycle.

## Who Dayu is for

Dayu is intended for researchers and developers building cloud-edge AI pipelines, comparing scheduling and offloading
policies, running multi-stream experiments, or extending applications and runtime behavior.

Start with the [architecture overview](/docs/architecture/brief-architecture), then follow the
[getting started guide](/docs/getting-started/preparation). Implementation-facing contracts live in the
[Dayu system repository](https://github.com/dayu-autostreamer/dayu/tree/main/docs).
