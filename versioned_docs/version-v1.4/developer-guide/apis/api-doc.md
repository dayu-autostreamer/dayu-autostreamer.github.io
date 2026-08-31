---
sidebar_label: API Reference
sidebar_position: 2
slug: /developer-guide/apis/api-doc
---

# API Reference

Dayu keeps route-level API documentation next to the implementation in the
[dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu) repository. This page summarizes the integration
surface and links to those code-backed references.

| Reference | Scope |
| --- | --- |
| [Backend API](https://github.com/dayu-autostreamer/dayu/blob/main/docs/api/backend.md) | Operator-facing catalog, configuration, installation, query, telemetry, visualization, and log endpoints. |
| [Runtime Service APIs](https://github.com/dayu-autostreamer/dayu/blob/main/docs/api/runtime-services.md) | Internal contracts between Scheduler, Generator, Controller, Processor, Distributor, Monitor, and datasource services. |
| [API section index](https://github.com/dayu-autostreamer/dayu/blob/main/docs/api/README.md) | Service map, transport conventions, and stability notes. |

## Backend API groups

The Backend is the public control-plane entry point used by the Dayu Frontend and operator integrations.

| Area | Main endpoints |
| --- | --- |
| Catalog and topology | `GET /policy`, `GET /service`, `GET /installed_service`, `GET /service_info/{service}`, `GET /edge_node` |
| DAG and datasource configuration | `GET/POST/DELETE /dag_workflow`, `GET/POST/DELETE /datasource` |
| Runtime lifecycle | `POST /install`, `GET /install_state`, `POST /stop_service` |
| Query lifecycle | `POST /submit_query`, `POST /stop_query`, `GET /query_state`, `GET /source_list`, `GET /datasource_state`, `POST /reset_datasource` |
| Results and telemetry | `GET /task_result`, `GET /system_parameters` |
| Visualization and logs | Result/system visualization configuration endpoints, `GET /download_log`, and `GET /download_system_log` |

## Lifecycle semantics

- A successful `POST /install` response acknowledges the request; it does not independently prove that the runtime is
  ready. Poll `GET /install_state` and begin runtime reads only when `ready=true`.
- `POST /stop_service` is asynchronous. Send the observed `install_id`, then poll `GET /install_state` until that target
  id disappears. An accepted response is not teardown completion.
- One Backend namespace is one shared administrative domain. Dayu does not provide built-in HTTP authentication or
  per-user isolation; production deployments should protect Frontend and Backend access at the ingress or gateway.
- `install_id` is a lifecycle precondition that prevents delayed requests from affecting a replacement installation.
  It is not an authentication token.
- The initial-deployment and redeployment responses define the complete desired Processor topology. Backend validates
  and materializes that exact plan without appending cloud or edge replicas.

The complete request and response schemas, including the installation state machine and telemetry status values, are
documented in the Backend API reference linked above.

## Runtime service APIs

Runtime routes are internal Dayu contracts rather than a general integration API. Components exchange serialized
`Task` payloads, transfer binary task data with `multipart/form-data` where required, and acknowledge ownership transfer
with an exact task UUID. Runtime workers follow the routes carried by the task and do not discover Kubernetes objects.

If an internal route changes, update the server, every in-repository caller, and the runtime API reference in the same
change. The structured processor output envelope is an application-development contract rather than a route-level API;
see [Add Applications](/docs/v1.4/developer-guide/how-to-develop/add-applications) for the generic contract. Service-specific
implementation details are maintained in the
[Structured Traffic Services reference](https://github.com/dayu-autostreamer/dayu/blob/main/docs/configuration/structured-traffic-services.md).
