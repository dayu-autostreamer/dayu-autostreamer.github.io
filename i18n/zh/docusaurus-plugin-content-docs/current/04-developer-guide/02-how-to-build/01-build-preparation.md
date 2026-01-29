---
sidebar_label: 构建准备工作
slug: /developer-guide/how-to-build/build-preparation
---

# 构建准备工作


## 简介
大禹系统部署在云边协同环境中，并支持异构设备，因此大禹的组件需要支持多架构（如`amd64`/`arm64`）。

构建多架构 Docker 镜像的简单方法是交叉构建。
`buildx` 是 Docker 提供的官方 Docker 构建工具，它帮助用户快速高效地构建 Docker 镜像，并支持在多个平台上构建。
用户可以使用 `buildx`在单个命令中构建多个架构的镜像，无需手动操作多个构建命令。

## 启用 Docker 实验模式
编辑 `/etc/docker/daemon.json` 并添加以下行：
```
{
  "experimental": true
}
```

重启docker以启用更改：
```bash
systemctl daemon-reload
systemctl restart docker
```


## 安装 Docker buildx

根据您的Docker版本，在https://github.com/docker/buildx/releases选择合适的buildx版本,
下载Docker buildx软件包（以下以版本buildx-v0.10.4.darwin-amd64为例）:
```bash
wget https://github.com/docker/buildx/releases/download/v0.10.4/buildx-v0.10.4.darwin-amd64
```

重命名并移动buildx包:
```bash
mv buildx-v0.10.4.darwin-amd64 docker-buildx
mv docker-buildx $HOME/.docker/cli-plugins
```

添加执行权限:
```bash
chmod +x ~/.docker/cli-plugins/docker-buildx
```

## 测试 docker buildx

使用以下命令测试buildx是否安装成功:
```bash
docker buildx version
```

如果 buildx 未成功安装，请使用以下命令查看可能的存在错误:
```bash
docker info
```