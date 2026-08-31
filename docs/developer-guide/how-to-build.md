---
sidebar_label: How to Build
sidebar_position: 2
slug: /developer-guide/how-to-build
---

# How to Build

Dayu uses Docker Bake to build and push the runtime and application images declared in `docker-bake.hcl`. Official
release images are published under [Docker Hub dayuhub](https://hub.docker.com/u/dayuhub).

## Prerequisites

- Docker with the Buildx plugin and Bake support. See [Install Docker Buildx](/docs/developer-guide/install-docker-buildx).
- Push access to the selected image registry.
- Permission to register `binfmt` handlers when cross-building on Linux. The Dayu wrapper performs this step before the
  first build unless it is explicitly disabled.

Validate the repository build matrix before starting a long multi-platform build:

```bash
make validate-build
```

## Image coordinates

The build accepts the following image-coordinate variables. The table uses example values; unset variables follow the
defaults in the current Makefile and Bake configuration.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `REG` | `docker.io` | Output registry |
| `REPO` | `dayuhub` | Output repository or namespace |
| `TAG` | `current-tag` | Output image tag |
| `BASE_REPO` | `dayuhub` | Repository containing Dayu base images |
| `BASE_TAG` | `latest` | Base-image tag used by JetPack variants |
| `NOCACHE` | `0` | Set to `1` to disable the BuildKit cache |

Override values for one command or export them for a build session:

```bash
REG=registry.example.com REPO=dayu TAG=current-tag make build WHAT=backend
```

## Select build targets

`WHAT` accepts comma-separated Bake targets or a named group:

```bash
# One component
make build WHAT=backend

# Several components
make build WHAT=monitor,generator

# Runtime shells or all application processors
make build WHAT=runtime
make build WHAT=processors

# The default runtime + processor set
make all

# Include the RTSP server and Dayu base-image variants
make build WHAT=all-images
```

The resolved platforms are defined per target in `docker-bake.hcl`. Most edge-capable services produce both
`linux/amd64` and `linux/arm64` images; cloud-only services produce `linux/amd64` images. Monitor and processor targets
also publish the configured JetPack variants.

:::note
The Bake output is `type=image,push=true`. A successful command pushes the selected images to the registry rather than
loading every multi-platform image into the local Docker image store.
:::

## Configure the builder

Dayu creates a `docker-container` builder named `dayu-buildx`. Optional BuildKit registry settings and builder driver
options are read from:

- `hack/resource/buildkitd.toml`
- `hack/resource/driver_opts.toml`

Templates in the same directory show private-registry, proxy, and concurrency settings. After changing either file,
recreate the builder so the new configuration is applied:

```bash
docker buildx rm dayu-buildx
make build WHAT=backend
```

Use [Configure Docker Registry](/docs/developer-guide/configure-docker-registry) when the output registry requires a
mirror, private certificate, or an explicitly configured development-only HTTP endpoint.
