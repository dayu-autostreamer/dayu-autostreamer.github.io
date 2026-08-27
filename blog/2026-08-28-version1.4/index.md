---
slug: version1.4
title: Dayu v1.4 Released
authors: [whzhou]
tags: [release]
---

**Dayu system Version 1.4 is released!**

<!-- truncate -->

### Breaking Changes

Replace application `JointMultiEdgeService` generation and edge-side Kubernetes discovery with immutable Sedna
`RuntimeService` resources, Scheduler-owned exact `RuntimeDirectory` routes, and revision task leases. Runtime workers
no longer ship the Kubernetes Python client or accept legacy discovery/cache configuration.

### Features

- Add transactional scheduler-first installation, RuntimeDirectory proposal/CAS publication, Redis-backed restart
  recovery, lease-aware drain, and exact-UID runtime retirement (`backend`/`scheduler`).
- Restrict Kubernetes access to the singleton backend with namespace-local lifecycle RBAC and a per-namespace cluster
  observer binding (`backend`).
- Unify all deployment policies on the validated `logical service -> node list` contract; add explicit cloud-only,
  full, and full-edge initial/redeployment policies; and let fixed policies resolve `@cloud` or apply
  `include_cloud=false|true` without a fixed cloud hostname (`scheduler`).
- Change the Generator hook lifecycle to filter an ingestion round, reserve its root task identity, schedule when due,
  and only then materialize source data (`generator`/`scheduler`).
- Add task-aware scheduling contracts with framework-reserved `TaskIdentity`, identity-attributed schedule decisions,
  canonical plan digests, idempotent Redis-backed pending-to-active task admission records, and a common Scheduler
  snapshot of resources, reservations, active tasks, and known task barriers (`generator`/`controller`/`scheduler`).
- Replace queue length with an atomic structured queue-state contract covering ordered waiting identities, running
  identity, and processing/handoff phase (`processor`/`monitor`/`scheduler`).
- Reorganize multi-file hook implementations into algorithm-owned packages with explicit `hook.py` entry points and
  names matching their sibling single-file Hook entries. 

### Bug Fix

- Fix possible failure in install/uninstall with one crash-recoverable ConfigMap CAS session and exact RuntimeService
  ownership identities (`backend`).
- Prevent source-selection scope from collapsing to the processor `node_set`, and reject invalid fixed source
  configuration instead of silently changing the selected source (`backend`/`scheduler`).
- Eliminate Kubernetes service-DNS search-path stalls by preserving stable RuntimeDirectory names while using absolute
  `*.svc.cluster.local.` hosts only at HTTP, Redis, iperf, and support-datasource connection boundaries.
- Remove the legacy per-source query startup delay and make result collection generation-scoped, immediately
  cancellable, and bounded by an explicit Distributor request timeout and batch size (`backend`/`distributor`).
- Make install lifecycle-cancellable: stop signals an in-flight RuntimeService activation/planning transaction before
  serialized cleanup, preserves its crash-recoverable ownership session, and removes pre-publication resources without
  waiting for an unready Scheduler or the full activation timeout (`backend`).
- Keep uninstall ownership until Foreground RuntimeService deletion and the complete Kubernetes dependent-resource
  barrier are empty; prolonged no-progress cleanup now remains retryable and install-fenced while exposing durable
  diagnostics to every frontend window (`backend`/`frontend`).
- Prevent Scheduler supervisor heartbeat timeouts and cascading Generator exits by running one direct Uvicorn process,
  dispatching blocking Redis endpoints through FastAPI's thread pool,  and reducing each task to Generator acquire plus
  Distributor final-renew/release (`generator`/`scheduler`).
- Prevent silent task loss with root-lease-scoped atomic artifacts, exact per-hop ownership ACKs, Generator/Processor
  backpressure, retry-safe parallel joins, and idempotent durable Distributor acceptance (`generator`/`processor`/
  `distributor`).
- Preserve Scheduler management rejection details through Backend RuntimeSession state and frontend presentation, and
  emit bounded Scheduler 4xx diagnostics without logging complete request payloads.
- Prevent schedule-plan corruption by isolating after-schedule hook mutations, and fix before-submit hooks
  to operate on the task passed by the Generator instead of an undefined Generator field (`scheduler`).
- Align built-in scheduling, deployment, redeployment, frame-processing, and compression hooks with full-DAG policy
  materialization and revision-consistent LIVE RuntimeDirectory state; preserve pipeline partition semantics while
  rejecting unsupported DAG shapes and inactive execution targets (`generator`/`scheduler`).

### Minor Update

- Add more services: traffic-detection, road-context-segmentation, traffic-signal-recognition, vehicle-tracking,
  vehicle-attribute-recognition, vehicle-trajectory-prediction, pedestrian-pose-estimation,
  pedestrian-intent-recognition, risk-graph-generation (`processor`).
- Change input/output format of processors from value to list (`processor`).
- Add import/export of dag in DAG Orchestrain frontend page (`frontend`).
- Update dockerfile building to support concise modification of ultra parameters.
- Unify input/output interface format of processors (`processor`).
- Add Gantt visualization to display task result (`frontend`/`backend`).


For more details, please refer to [dayu-v1.4](https://github.com/dayu-autostreamer/dayu/releases/tag/v1.4).

