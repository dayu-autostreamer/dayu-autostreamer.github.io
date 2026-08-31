---
sidebar_label: Configure Docker Registry
slug: /developer-guide/configure-docker-registry
unlisted: true
---

# Configure Docker Registry

Dayu's multi-platform build publishes images directly to a registry, and every cloud or edge node that can host a
runtime service must be able to pull those images. Use an authenticated TLS registry for shared or production
environments.

## Use a registry mirror

A pull-through mirror can improve access to public base images. Configure an organization-approved mirror in the Docker
daemon on the build host:

```json
{
  "registry-mirrors": ["https://mirror.example.com"]
}
```

Restart Docker after changing its daemon configuration. Mirror availability and trust policy are environment-specific;
do not copy an unknown public mirror into production configuration.

## Use a private registry

Provisioning and securing the registry itself is outside Dayu's deployment lifecycle. Before building, confirm that:

- the build host can authenticate and push;
- every Kubernetes and KubeEdge node can resolve the registry name and pull through its container runtime;
- private certificate authorities are trusted on the build host and all deployment nodes;
- `template/base.yaml` uses the same registry, repository, and tag under `default-image-meta`.

Build and push the selected images by setting the Makefile coordinates:

```bash
docker login registry.example.com
REG=registry.example.com REPO=dayu TAG=current-tag make build WHAT=runtime
```

Then update the registry, repository, and tag fields in the existing deployment template block:

```yaml
default-image-meta:
  registry: registry.example.com
  repository: dayu
  tag: current-tag
```

## Development-only HTTP registry

If an isolated development network must use an HTTP registry, configure both the Docker daemon and the BuildKit builder.
For Docker Engine, add the endpoint to `/etc/docker/daemon.json`:

```json
{
  "insecure-registries": ["repo:5000"]
}
```

Add the same endpoint to `hack/resource/buildkitd.toml`:

```toml
[registry."repo:5000"]
  http = true
  insecure = true
```

Restart Docker, then recreate the Dayu builder:

```bash
docker buildx rm dayu-buildx
REG=repo:5000 REPO=dayuhub TAG=current-tag make build WHAT=backend
```

The container runtime on every deployment node also needs an equivalent registry trust configuration. Docker and
containerd use different configuration files, so follow the documentation for the runtime installed on that node.

:::caution
An insecure registry sends image traffic without TLS verification. Keep this setup inside a trusted development
network; use TLS and authentication for shared environments.
:::
