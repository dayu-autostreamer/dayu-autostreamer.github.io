---
sidebar_label: Brief Architecture
sidebar_position: 1
slug: /architecture/brief-architecture
---

# Brief Architecture

Dayu uses a five-layer architecture. The **basic system layer** and **intermediate interface layer** form the lower-layer
platform for cluster orchestration, runtime deployment, and cross-node communication. The **system support layer**,
**collaboration scheduling layer**, and **application service layer** form the upper-layer system that users configure
and operate.

![Dayu architecture](/img/architecture/arch.svg)

## Runtime flow

1. Operators start the support services and select the datasource, DAG, scheduling policy, and target nodes.
2. Dayu deploys the required runtime services across cloud and edge nodes and confirms that the application runtime is ready.
3. Stream data becomes tasks that move through the DAG according to the selected scheduling decisions.
4. Controlled runtime updates adjust execution placement while allowing in-flight work to complete consistently.
5. Results and telemetry are collected for visualization, analysis, and further policy evaluation.

## Layer responsibilities

- **[Basic System Layer](/docs/architecture/basic-system-layer)** provides the cluster substrate across cloud and edge nodes.
- **[Intermediate Interface Layer](/docs/architecture/intermediate-interface-layer)** provides runtime deployment and
  cross-node service communication.
- **[System Support Layer](/docs/architecture/system-support-layer)** provides the user interface, system control,
  datasource management, and platform state.
- **[Collaboration Scheduling Layer](/docs/architecture/collaboration-scheduling-layer)** coordinates task generation,
  scheduling, execution, result delivery, and resource observation.
- **[Application Service Layer](/docs/architecture/application-service-layer)** provides user-composable AI services
  through common interfaces and templates.

For implementation-level lifecycle and API details, see the
[repository documentation](https://github.com/dayu-autostreamer/dayu/tree/main/docs).
