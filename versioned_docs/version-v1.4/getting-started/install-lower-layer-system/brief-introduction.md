---
sidebar_label: Brief Introduction
sidebar_position: 1
slug: /getting-started/install-lower-layer-system/brief-introduction
---

# Install Lower-Layer System

## Introduction

The lower-layer system provides the Kubernetes/KubeEdge cluster, Sedna runtime management, and EdgeMesh service
communication required by Dayu. Install it on the cloud-edge cluster before starting Dayu's support services.

For the role of each component, see the [architecture overview](/docs/v1.4/architecture/brief-architecture).

## Companion components

The current system uses `dayu-sedna v1.1` and `dayu-edgemesh v1.1`. Both components must use the same minor version;
do not mix minor versions.

## Installation order

1. [Prepare the nodes](/docs/v1.4/getting-started/install-lower-layer-system/prerequisites).
2. [Install Kubernetes](/docs/v1.4/getting-started/install-lower-layer-system/install-kubernetes) on the cloud node.
3. [Install KubeEdge](/docs/v1.4/getting-started/install-lower-layer-system/install-kubeedge) and join the edge nodes.
4. [Install EdgeMesh](/docs/v1.4/getting-started/install-lower-layer-system/install-edgemesh).
5. [Install Sedna](/docs/v1.4/getting-started/install-lower-layer-system/install-sedna).
6. Optionally [install NVIDIA GPU support](/docs/v1.4/getting-started/install-lower-layer-system/install-nvidia-gpu-support).

## Before continuing

- Confirm every required node is `Ready` and node clocks are synchronized.
- Confirm Sedna GM can communicate with every LC.
- Confirm EdgeMesh agents are healthy on the cloud and edge nodes.
- Confirm endpoint-bearing RuntimeServices can reach `Activated=True` and `Ready=True`; a running Pod alone is not
  sufficient for Dayu.
- Check [FAQs](/docs/v1.4/getting-started/install-lower-layer-system/faqs) for known cluster, DNS, GPU, and routing issues.
