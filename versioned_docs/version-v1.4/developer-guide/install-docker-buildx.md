---
sidebar_label: Install Docker Buildx
slug: /developer-guide/install-docker-buildx
unlisted: true
---

# Install Docker Buildx

Dayu publishes images for heterogeneous cloud and edge nodes. Its build wrapper therefore requires Docker Buildx,
Docker Bake, and a builder capable of producing the platforms declared in `docker-bake.hcl`.

## Install or update Docker

[Docker Desktop](https://docs.docker.com/desktop/) includes Buildx on macOS, Windows, and Linux. For a standalone Linux
host, install Docker Engine and the `docker-buildx-plugin` package from Docker's
[official installation repository](https://docs.docker.com/engine/install/). Avoid pinning an old standalone Buildx
binary unless the host cannot use the supported Docker packages.

Verify the client and daemon before building:

```bash
docker version
docker buildx version
docker buildx bake --help
```

Docker's [multi-platform build guide](https://docs.docker.com/build/building/multi-platform/) describes the available
emulation, native-node, and cross-compilation strategies.

## Dayu builder behavior

On the first real build, `hack/lib/buildx.sh`:

1. registers multi-architecture handlers with `tonistiigi/binfmt`;
2. creates the `dayu-buildx` builder with the `docker-container` driver;
3. loads `hack/resource/buildkitd.toml` and `hack/resource/driver_opts.toml`;
4. runs the selected targets from `docker-bake.hcl`.

The `binfmt` registration uses a privileged container. On a host where the handlers are already managed or where only
native targets are used, skip that step explicitly:

```bash
DAYU_BUILDX_SKIP_BINFMT=true make build WHAT=backend
```

After the first build, inspect the builder with:

```bash
docker buildx inspect dayu-buildx --bootstrap
docker buildx ls
```

If the builder was created with stale registry or proxy settings, remove only the Dayu builder and run the build again:

```bash
docker buildx rm dayu-buildx
make build WHAT=backend
```
