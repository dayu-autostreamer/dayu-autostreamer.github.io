---
sidebar_label: 如何构建
sidebar_position: 2
slug: /developer-guide/how-to-build
---

# 如何构建

大禹系统使用 Docker Bake 构建并推送 `docker-bake.hcl` 中声明的运行时与应用镜像。正式发布镜像位于
[Docker Hub dayuhub](https://hub.docker.com/u/dayuhub)。

## 前置条件

- 支持 Buildx plugin 和 Bake 的 Docker。安装方法见[安装 Docker Buildx](/docs/v1.4/developer-guide/install-docker-buildx)。
- 对目标镜像仓库具有 push 权限。
- 在 Linux 上交叉构建时，具有注册 `binfmt` handler 的权限。除非显式关闭，大禹系统的构建 wrapper 会在首次构建前执行该步骤。

开始耗时较长的多架构构建前，先校验仓库中的构建矩阵：

```bash
make validate-build
```

## 镜像坐标

构建接受以下镜像坐标变量。表中使用示例值；未设置的变量遵循当前 Makefile 与 Bake 配置中的默认值。

| 变量 | 示例值 | 用途 |
| --- | --- | --- |
| `REG` | `docker.io` | 输出 registry |
| `REPO` | `dayuhub` | 输出 repository 或 namespace |
| `TAG` | `current-tag` | 输出镜像标签 |
| `BASE_REPO` | `dayuhub` | 大禹系统基础镜像所在 repository |
| `BASE_TAG` | `latest` | JetPack 变体使用的基础镜像标签 |
| `NOCACHE` | `0` | 设为 `1` 时关闭 BuildKit cache |

可以只覆盖一条命令，也可以为当前构建会话 export 这些变量：

```bash
REG=registry.example.com REPO=dayu TAG=current-tag make build WHAT=backend
```

## 选择构建目标

`WHAT` 接受逗号分隔的 Bake target 或命名 group：

```bash
# 单个组件
make build WHAT=backend

# 多个组件
make build WHAT=monitor,generator

# 运行时外壳或全部应用 processor
make build WHAT=runtime
make build WHAT=processors

# 默认的 runtime + processor 集合
make all

# 额外包含 RTSP server 与大禹系统基础镜像变体
make build WHAT=all-images
```

每个 target 的目标平台在 `docker-bake.hcl` 中定义。大多数可运行在边缘侧的服务会同时生成
`linux/amd64` 和 `linux/arm64` 镜像；cloud-only 服务只生成 `linux/amd64` 镜像。Monitor 与 processor
target 还会发布已配置的 JetPack 变体。

:::note
Bake 输出为 `type=image,push=true`。命令成功后会把所选镜像推送到 registry，而不是把所有多架构镜像加载到
本地 Docker image store。
:::

## 配置 builder

大禹系统会创建名为 `dayu-buildx` 的 `docker-container` builder。可选的 BuildKit registry 设置和 builder
driver option 分别从以下文件读取：

- `hack/resource/buildkitd.toml`
- `hack/resource/driver_opts.toml`

同目录模板给出了私有仓库、代理和并发限制示例。修改任一文件后，应重新创建 builder 以应用新配置：

```bash
docker buildx rm dayu-buildx
make build WHAT=backend
```

如果输出 registry 需要 mirror、私有证书或显式配置的开发环境 HTTP endpoint，见
[配置 Docker 镜像仓库](/docs/v1.4/developer-guide/configure-docker-registry)。
