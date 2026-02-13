---
sidebar_label: 如何构建
sidebar_position: 2
slug: /developer-guide/how-to-build
---

# 如何构建

## 构建准备工作

大禹系统的构建依赖 docker buildx 构建多架构镜像，从而适配云/边异构设备，你可参照 [安装 Docker Buildx](/docs/developer-guide/install-docker-buildx) 来安装 Docker Buildx。

## 构建系统组件

大禹系统中的组件依赖于 Docker 容器，因此，如果您需要自定义大禹系统组件，您应该构建指定的镜像。

官方大禹系统的 Docker 镜像图片位于[dockerhub/dayuhub](https://hub.docker.com/u/dayuhub)。

设置 Docker 构建元信息：
```bash
# 配置 buildx buildkitd (默认为空，示例在 hack/resource/buildkitd_template.toml)
# http 源连接可以在 buildkitd.toml 中配置
vim hack/resource/buildkitd.toml

# 配置 buildx driver-opt (默认为空，样例在 hack/resource/driver_opts_template.toml)
# 网络代理可以在 driver_opts.toml 中配置
vim hack/resource/driver_opts.toml

# 设置 Docker 镜像元信息
# 默认 REG 是 docker.io
# 默认 REPO 是 dayuhub
# 默认 TAG 是 https://github.com/dayu-autostreamer/dayu/releases/ 中的最新release号
# 如果不想使用默认值，请在下面 export 对应变量
export REG=xxx
export REPO=xxx
export TAG=xxx
```

构建所有镜像：
```bash
make all
```

构建指定镜像：
```bash
# xxx/yyy/zzz/... 指需要构建的组件名（如 scheduler,backend,frontend），你可以选择组件来构建
make build WHAT=xxx,yyy,zzz...
```


注意：如果您更改配置文件（buildkitd.toml/driver_opts.toml），请在 make 之前删除 buildx creator。
当您在构建docker时遇到错误时，也建议尝试删除 buildx creator 以修复错误。
```bash
# 查看所有 buildx creator.
docker buildx ls

# 删除 dayu-buildx，他会在下次 make 时自动重新生成。
docker buildx stop dayu-buildx
docker buildx rm dayu-buildx
```
