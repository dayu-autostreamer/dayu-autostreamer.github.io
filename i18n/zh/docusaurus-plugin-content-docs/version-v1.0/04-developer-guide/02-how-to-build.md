---
sidebar_label: How to Build
slug: /developer-guide/how-to-build
custom_edit_url: null
---

# How to Build

Components in Dayu system are dependent on docker containers. Thus, if you need to customize dayu system you should build specified images.

The official images of Dayu system is at [dockerhub/dayuhub](https://hub.docker.com/u/dayuhub).

set meta information of building
```bash
# configure buildx buildkitd (default as empty, example at hack/resource/buildkitd_template.toml)
# http registry can be configured in buildkitd.toml
vim hack/resource/buildkitd.toml

# configure buildx driver-opt (default as empty, example at hack/resource/driver_opts_template.toml)
# proxy can be configured in driver_opts.toml
vim hack/resource/driver_opts.toml

# set docker meta info
# default REG is docker.io
# default REPO is dayuhub
# default TAG is v1.0
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
# xxx/yyy/zzz/... refers to component name, you can choose components for building.
make build WHAT=xxx,yyy,zzz...
```

If you change configuration files (buildkitd.toml/driver_opts.toml), you should delete buildx creator before make.
You are also recommended to try to delete buildx creator when you encounter error in docker building to fix the error.
```bash
# view all buildx creator.
docker buildx ls

# delete dayu-buildx, it will be re-generated when make.
docker buildx stop dayu-buildx
docker buildx rm dayu-buildx
```

