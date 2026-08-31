---
sidebar_label: 配置 Docker 镜像仓库
slug: /developer-guide/configure-docker-registry
unlisted: true
---

# 配置 Docker 镜像仓库

大禹系统的多架构构建会把镜像直接推送到 registry；所有可能承载运行时服务的云端或边缘节点都必须能够拉取这些
镜像。共享或生产环境应使用带身份认证的 TLS registry。

## 使用 registry mirror

Pull-through mirror 可以改善公共基础镜像的访问。请在构建主机的 Docker daemon 中配置组织认可的 mirror：

```json
{
  "registry-mirrors": ["https://mirror.example.com"]
}
```

修改 daemon 配置后重启 Docker。Mirror 的可用性与信任策略取决于具体环境，不要把来源不明的公共 mirror
直接写入生产配置。

## 使用私有 registry

Registry 本身的部署和安全加固不属于大禹系统的部署生命周期。构建前应确认：

- 构建主机能够完成身份认证和 push；
- 每个 Kubernetes/KubeEdge 节点都能解析 registry 名称，并通过其 container runtime 拉取镜像；
- 构建主机和全部部署节点都信任私有 CA；
- `template/base.yaml` 的 `default-image-meta` 使用相同的 registry、repository 和 tag。

通过 Makefile 镜像坐标构建并推送所选镜像：

```bash
docker login registry.example.com
REG=registry.example.com REPO=dayu TAG=current-tag make build WHAT=runtime
```

然后更新现有部署模板配置块中的 registry、repository 和 tag：

```yaml
default-image-meta:
  registry: registry.example.com
  repository: dayu
  tag: current-tag
```

## 仅开发环境使用 HTTP registry

如果隔离的开发网络必须使用 HTTP registry，需要同时配置 Docker daemon 和 BuildKit builder。对于 Docker
Engine，在 `/etc/docker/daemon.json` 中加入 endpoint：

```json
{
  "insecure-registries": ["repo:5000"]
}
```

在 `hack/resource/buildkitd.toml` 中加入同一 endpoint：

```toml
[registry."repo:5000"]
  http = true
  insecure = true
```

重启 Docker，再重新创建大禹系统的 builder：

```bash
docker buildx rm dayu-buildx
REG=repo:5000 REPO=dayuhub TAG=current-tag make build WHAT=backend
```

每个部署节点上的 container runtime 也需要等价的 registry 信任配置。Docker 与 containerd 使用不同的
配置文件，请遵循该节点实际 runtime 的文档。

:::caution
Insecure registry 不会验证 TLS。该配置只能用于可信的开发网络；共享环境应启用 TLS 和身份认证。
:::
