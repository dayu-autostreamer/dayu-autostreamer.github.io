---
sidebar_label: Collaboration Scheduling Layer
sidebar_position: 5
slug: /architecture/collaboration-scheduling-layer
---

# Collaboration Scheduling Layer

The collaboration scheduling layer executes each stream task against a selected service DAG. It consists of six runtime
component types.

![Upper-layer structure](/img/architecture/upper-layer-structure.png)

| Component | Responsibility |
| --- | --- |
| [Generator](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/generator) | Reads one selected source, reserves a task identity, requests a schedule when due, materializes source data, and submits the task. |
| [Scheduler](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/scheduler) | Owns policy state, source and deployment plans, resource snapshots, task admission, leases, and the versioned RuntimeDirectory. |
| [Controller](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/controller) | Forwards a task along its DAG, coordinates branches and joins, and requires an acknowledgement before releasing the next-hop payload. |
| [Processor](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/processor) | Runs one logical AI service, manages its local task queue, and returns normalized service output. |
| [Distributor](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/distributor) | Durably stores completed tasks, serves incremental results and files, exports logs, and releases the final task lease. |
| [Monitor](https://github.com/dayu-autostreamer/dayu/tree/main/dependency/core/monitor) | Samples resource and structured queue state and reports it to Scheduler. |

Processor replicas are created only on nodes returned by the complete validated deployment plan. Deployment policies
must include every required edge or cloud replica explicitly; Backend does not append replicas after validation.
Backend creates the supporting Controller and Monitor routes needed by that plan and publishes the complete route set
only after activation.

Each schedule decision contains a directory revision and exact runtime routes. Generator copies that commitment into
the task; Controller and Processor never perform cluster discovery. During a processor rollout, new tasks use the new
revision while existing tasks retain their immutable old routes until their leases complete or the configured
retirement grace expires.

Scheduling behavior remains extensible through hook families for configuration extraction, policy agents, source
selection, initial deployment, and redeployment. See [Customize Scheduling](/docs/developer-guide/how-to-develop/customize-scheduling).
