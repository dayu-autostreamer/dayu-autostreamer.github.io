---
sidebar_label: 构建准备工作
slug: /developer-guide/how-to-build/build-preparation
custom_edit_url: null
---

# 构建准备工作

[TBD]

## Introduction
Dayu is deployed on a cloud-edge collaborative environment with heterogeneous devices, which requires components in dayu has multi-architecture (like `amd64`/`arm64`). 

An easy way to build multi-architecture docker images is cross-building. 
`buildx` is an official Docker build tool provided by Docker, which helps users quickly and efficiently build Docker images and supports building on multiple platforms. With `buildx`, users can build images for multiple architectures in a single command without manually operating multiple build commands. 

## Enable Docker Experimental Mode
Edit `/etc/docker/daemon.json` and add the following line:
```
{
  "experimental": true
}
```

Restart docker to enable the change.
```bash
systemctl daemon-reload
systemctl restart docker
```


## Install Docker Buildx

Choose an appropriate buildx version at https://github.com/docker/buildx/releases based on your docker version.

Download docker buildx package (we take version buildx-v0.10.4.darwin-amd64 as an example).
```bash
wget https://github.com/docker/buildx/releases/download/v0.10.4/buildx-v0.10.4.darwin-amd64
```

Rename and move buildx package.
```bash
mv buildx-v0.10.4.darwin-amd64 docker-buildx
mv docker-buildx $HOME/.docker/cli-plugins
```

Add execution permission.
```bash
chmod +x ~/.docker/cli-plugins/docker-buildx
```

## Test Buildx

Use the following command to test whether buildx installed successfully.
```bash
docker buildx version
```

If buildx is not installed successfully, use the following command to see the possible error.
```bash
docker info
```