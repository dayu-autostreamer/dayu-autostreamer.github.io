---
sidebar_label: System Support Layer
sidebar_position: 4
slug: /architecture/system-support-layer
---

# System Support Layer

The system support layer exposes Dayu's operator workflow and provides the services needed before an application runtime
is installed.

| Service | Responsibility |
| --- | --- |
| [Frontend](https://github.com/dayu-autostreamer/dayu/tree/main/frontend) | Vue-based UI for DAGs, datasources, installation, query control, visualizations, and log export. |
| [Backend](https://github.com/dayu-autostreamer/dayu/tree/main/backend) | Control-plane API, template composition, the only Kubernetes access, RuntimeService lifecycle, telemetry cache, and visualization rendering. |
| [Datasource](https://github.com/dayu-autostreamer/dayu/tree/main/datasource) | Optional HTTP/RTSP simulation sources and manifest-based video playback. |
| Redis | Persistent Scheduler state for the active RuntimeDirectory, proposals, task reservations, and leases. |

The support layer and application runtime have separate lifecycles. `ACTION=start` makes Frontend and Backend available,
but it does not select a DAG or create application workers. `POST /install` performs that transaction. Similarly,
`POST /stop_service` removes the application runtime asynchronously, while `ACTION=stop` completes support-layer
teardown.

One Dayu namespace is one shared lifecycle domain. All frontend windows connected to the same Backend observe the same
installation and query state. The frontend's local form draft is only a convenience; Backend's `/install_state` and
`/query_state` responses remain authoritative.
