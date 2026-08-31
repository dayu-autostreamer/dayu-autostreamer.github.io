---
sidebar_label: 安装 Docker Buildx
slug: /developer-guide/install-docker-buildx
unlisted: true
---

# 安装 Docker Buildx

大禹系统需要为异构云边节点发布镜像，因此构建 wrapper 依赖 Docker Buildx、Docker Bake，以及能够生成
`docker-bake.hcl` 所声明平台的 builder。

## 安装或更新 Docker

[Docker Desktop](https://docs.docker.com/desktop/) 在 macOS、Windows 和 Linux 上都包含 Buildx。对于独立
Linux 主机，请从 Docker 的[官方安装仓库](https://docs.docker.com/engine/install/)安装 Docker Engine 和
`docker-buildx-plugin` 软件包。除非主机无法使用受支持的 Docker 软件包，否则不建议固定旧版独立 Buildx
二进制文件。

构建前先检查 client 与 daemon：

```bash
docker version
docker buildx version
docker buildx bake --help
```

Docker 的[多平台构建指南](https://docs.docker.com/build/building/multi-platform/)介绍了 emulation、native
node 和 cross-compilation 三类方案。

## 大禹系统 builder 行为

第一次实际构建时，`hack/lib/buildx.sh` 会：

1. 通过 `tonistiigi/binfmt` 注册多架构 handler；
2. 使用 `docker-container` driver 创建 `dayu-buildx` builder；
3. 加载 `hack/resource/buildkitd.toml` 和 `hack/resource/driver_opts.toml`；
4. 运行 `docker-bake.hcl` 中选定的 target。

注册 `binfmt` 会使用 privileged container。如果 handler 已由主机统一管理，或只构建 native target，可以
显式跳过：

```bash
DAYU_BUILDX_SKIP_BINFMT=true make build WHAT=backend
```

首次构建后可检查 builder：

```bash
docker buildx inspect dayu-buildx --bootstrap
docker buildx ls
```

如果 builder 使用了过期的 registry 或代理设置，只移除大禹系统的 builder，然后重新构建：

```bash
docker buildx rm dayu-buildx
make build WHAT=backend
```
