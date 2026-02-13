---
sidebar_label: Brief Introduction
sidebar_position: 1
slug: /getting-started/install-lower-layer-system/brief-introduction
---

# Install Lower-Layer System

## Introduction

The lower-layer system of dayu is the foundation of the entire system, mainly composed of KubeEdge and some plugins. 
It needs to be pre-installed on edge-distributed nodes. 

For the specific functions and structure of the lower-layer system, please refer to [architecture](/docs/architecture/brief-architecture).

## Installation Process

Please install in the following order:

- [Prepare for pre-requisites](/docs/getting-started/install-lower-layer-system/pre-requisites)
- [Install Kubernetes](/docs/getting-started/install-lower-layer-system/install-kubernetes)
- [Install KubeEdge](/docs/getting-started/install-lower-layer-system/install-kubernetes)
- [Install EdgeMesh](/docs/getting-started/install-lower-layer-system/install-kubeedge)
- [Install Sedna](/docs/getting-started/install-lower-layer-system/install-edgemesh)
- [Install Nvidia GPU Support](/docs/getting-started/install-lower-layer-system/install-nvidia-gpu-support)

## Tips

Please read the following tips before installing:

- Since the installation is performed on a cloud-edge distributed cluster, please confirm the **execution location** of the operation before any action.
- **Kubernetes only needs to be installed on the master node (cloud)**, other nodes do not need it.
- KubeEdge is installed on all nodes, with the prerequisite that there must be k8s on the master node.
- Some plugins like calico, edgemesh, sedna, metric-service, and kuborad are started through YAML files, so the actual files to be downloaded are the k8s control tool kubeadm and the kubeedge control tool keadm. Then prepare the YAML file mentioned earlier, start k8s and kubeedge, and directly create containers based on the YAML file.
- **Calico only needs to be installed on the master**, as it is a plugin for node communication. Without it, installing coredns for kubeedge on the master will result in an error; however, calico does not need to be installed on edge nodes, as kubeedge has its own communication mechanism specifically for edge nodes.
- Namespace can be considered as different virtual projects, service is the specified task target file, and pods are the specific containers created based on the service or other YAML files.
- A physical node can have many pods, and pods are the smallest operable units. A service can set up many pods, and a service can include pods cross many physical nodes.
- **If it is a host container creation task, set dnsPolicy** (it is important and may cause a sedna-lc exception to report an error)
- When pulling Docker images, you must first **confirm whether the architecture (amd64/arm64) is supported**.
- It is recommended to directly enter the root user to perform system deployment, and you can exit the root user after the deployment is completed.
- Before deployment, you can get familiar with [common commands](/docs/getting-started/install-lower-layer-system/common-commands).
- Please check [Q&A](/docs/getting-started/install-lower-layer-system/faqs) first if you encounter any problems.
- Most of the components in the lower-layer system are customized based on the official/open-source software, so if you encounter unsolvable problems during the installation process, you can search for the problem yourself and try to solve it. Also, you can [submit an issue](https://github.com/dayu-autostreamer/dayu/issues) or [contact us](/docs/community/contact-us).

