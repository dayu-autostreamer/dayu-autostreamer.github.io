---
sidebar_label: Basic System Layer
sidebar_position: 2
slug: /architecture/basic-system-layer
---

# Basic System Layer


The basic system layer provides container orchestration for dayu system by deploying the **[KubeEdge container orchestration framework](https://kubeedge.io/)** on cloud-edge distributed nodes.
**KubeEdge** is an extension of the **[Kubernetes framework](https://kubernetes.io/)** proposed by Huawei for edge scenarios, which can be well deployed on devices with limited resources and low performance, thus establishing a container orchestration basic framework on cloud servers and edge nodes.


Specifically, **KubeEdge** uses the CloudCore and EdgeCore to implement containerized application orchestration and device management in the cloud-edge environment.
In particular, the CloudCore component is deployed on the cloud server (there is only one cloud server in the entire cloud-edge distributed environment) and is responsible for communicating with the EdgeCore components on the edge devices and managing the maintenance of the entire cloud-edge distributed device cluster,
making the cloud server act as the master node in the entire cloud-edge collaborative multi-device; the EdgeCore component is deployed on each edge device, responsible for managing the device itself and communicating with the CloudCore on the cloud server, maintaining the necessary work for cloud-edge collaboration.

![lower-layer-structure.png](/img/architecture/lower-layer-structure.png)

