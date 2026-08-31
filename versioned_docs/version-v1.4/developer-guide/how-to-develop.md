---
sidebar_label: How to Develop
sidebar_position: 1
slug: /developer-guide/how-to-develop
---

# How to Develop

Dayu keeps the runtime lifecycle in stable service shells and exposes application, scheduling, monitoring, datasource,
and visualization behavior through templates and hooks. Start by choosing the extension surface that matches the change
instead of modifying the complete request path.

## Development environment

The repository declares Python 3.8 and Node.js 20 for local and CI-compatible checks. Docker with Buildx is required
only when building images.

```bash
git clone https://github.com/dayu-autostreamer/dayu.git
cd dayu

make install-python-dev
make frontend-install
make help
```

## Repository map

| Path | Purpose |
| --- | --- |
| `backend/` | Control-plane APIs, template composition, RuntimeService lifecycle, telemetry, and visualization. |
| `frontend/` | Vue operator interface and lifecycle state management. |
| `datasource/` | HTTP/RTSP sources and manifest-based playback. |
| `dependency/core/` | Runtime services, algorithms, common contracts, and application implementations. |
| `template/` | Policy, service, component, and visualization configuration. |
| `docker-bake.hcl` and `build/` | Image matrix and Dockerfiles. |
| `docs/` | Implementation-facing API, architecture, configuration, hook, operations, and testing references. |
| `tests/` | Unit, integration, component, end-to-end, frontend, and optional ML tests. |

The repository-local [quick start](https://github.com/dayu-autostreamer/dayu/blob/main/docs/repository-quickstart.md)
and [concepts](https://github.com/dayu-autostreamer/dayu/blob/main/docs/concepts.md) pages are the best code-oriented
entry points.

## Choose an extension path

- Add an AI service: follow [Add Applications](/docs/v1.4/developer-guide/how-to-develop/add-applications).
- Add a scheduling policy or hook: follow
  [Customize Scheduling](/docs/v1.4/developer-guide/how-to-develop/customize-scheduling).
- Add another runtime hook family: use [Hook Functions](/docs/v1.4/developer-guide/apis/hook-functions).
- Add or rename an image: update `docker-bake.hcl`, the Dockerfile, and run `make validate-build`.
- Change a public API or lifecycle: update the implementation-facing repository docs and the corresponding website
  guide in the same change.

## Validate the change

Run the narrowest relevant tests while developing, then use the aggregate checks before review:

```bash
make validate-build
make test-unit-integration
make frontend-check
make check
```

ML-backed scheduler and application tests are optional in the default environment. Run `make test-python-ml` in an
environment with the declared ML dependencies when the change affects those paths. See the
[testing guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/testing/README.md) for test-layer boundaries.
