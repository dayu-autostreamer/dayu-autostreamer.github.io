---
sidebar_label: Key Features
sidebar_position: 2
slug: /introduction/key-features
---

# Key Features

Dayu covers the complete lifecycle of a cloud-edge stream analytics application: DAG composition, runtime deployment,
scheduling, execution, observation, and extension.

## DAG-based AI service pipelines

Applications are modeled as directed acyclic graphs rather than fixed linear chains. A DAG may branch into several AI
services, join their results, and assign each logical stage to a different execution node. Workflows can be created in
the frontend or imported and exported as `.dag` files.

## Coordinated cloud-edge runtime

Dayu deploys the services required by an application as a coordinated runtime and makes the workflow available after
that runtime is ready. Controlled updates keep in-flight work consistent when deployment decisions change.

## Adaptive scheduling and deployment

Pluggable policies cover source selection, deployment, data configuration, offloading, and admission. Built-in
baselines and research schedulers can be compared under the same runtime and observability model. See
[Customize Scheduling](/docs/developer-guide/how-to-develop/customize-scheduling) for the policy catalog and extension
points.

## Hook-driven extensibility

Hooks and templates let developers extend scheduling, data generation, processing, monitoring, and visualization
without rewriting the runtime lifecycle.

## Built-in AI service catalog

The catalog includes detection, tracking, classification, recognition, model switching, and structured traffic
analysis. Generic input/output forms keep these services composable in different DAGs.

## Observability and experiment feedback

Result visualizers render frames, structured overlays, curves, topology, CDF, and Gantt views. System telemetry covers
compute, memory, network, model execution, scheduling, and queue behavior. Result records and system snapshots can be
exported for offline analysis.

## Next steps

Read the [architecture overview](/docs/architecture/brief-architecture), follow
[getting started](/docs/getting-started/preparation), or use the
[developer guide](/docs/developer-guide/how-to-develop) to extend Dayu.
