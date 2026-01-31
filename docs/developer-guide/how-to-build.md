---
sidebar_label: How to Build
sidebar_position: 2
slug: /developer-guide/how-to-build
---

# How to Build

Components in the dayu system are dependent on docker containers. Thus, if you need to customize dayu system you should build specified images.

The official images of Dayu system is at [dockerhub/dayuhub](https://hub.docker.com/u/dayuhub).

## Prepare for building

Dayu relies on docker buildx to build multi-arch images for cloud/edge devices, you can refer to [Install Docker Buildx](/docs/developer-guide/install-docker-buildx) to install docker buildx.

## Build components

set meta information of building
```bash
# configure buildx buildkitd (default as empty, example at hack/resource/buildkitd_template.toml)
# http registry can be configured in buildkitd.toml
vim hack/resource/buildkitd.toml

# configure buildx driver-opt (default as empty, example at hack/resource/driver_opts_template.toml)
# network proxy can be configured in driver_opts.toml
vim hack/resource/driver_opts.toml

# set docker meta info
# default REG is docker.io
# default REPO is dayuhub
# default TAG is the latest tag in https://github.com/dayu-autostreamer/dayu/releases/
# if you don't want to use default values, please export corresponding variables below
export REG=xxx
export REPO=xxx
export TAG=xxx
```

build all images
```bash
make all
```

build specified images
```bash
# xxx/yyy/zzz/... refers to component name(e.g, scheduler,backend,frontend), you can choose components for building.
make build WHAT=xxx,yyy,zzz...
```

NOTE: If you change configuration files (buildkitd.toml/driver_opts.toml), you should delete buildx creator before make.
You are also recommended to try to delete buildx creator when you encounter error in docker building to fix the error.
```bash
# view all buildx creator.
docker buildx ls

# delete dayu-buildx, it will be re-generated when make.
docker buildx stop dayu-buildx
docker buildx rm dayu-buildx
```



