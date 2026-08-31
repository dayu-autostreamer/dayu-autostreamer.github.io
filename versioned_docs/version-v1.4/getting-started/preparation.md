---
sidebar_label: Preparation
sidebar_position: 1
slug: /getting-started/preparation
---

# Preparation

## Deployment path

Dayu is installed in two stages:

1. Install the lower-layer cluster components on the cloud and edge nodes. This is normally done once for a cluster.
2. Configure and start the upper-layer Dayu services. The support layer and application runtime can then be started and
   stopped independently as needed.

Follow [Install Lower-Layer System](/docs/v1.4/getting-started/install-lower-layer-system/brief-introduction), then
[Start Upper-Layer System](/docs/v1.4/getting-started/start-upper-layer-system/brief-introduction).

## Environment checklist

Prepare the following before installation:

- one Linux cloud node that acts as the Kubernetes/KubeEdge control plane;
- one or more Linux edge nodes with stable, unique hostnames;
- network reachability between the cloud and edge management endpoints;
- synchronized clocks on all nodes;
- Docker and sufficient local storage for images, mounted models, datasource files, and Dayu runtime state;
- optional NVIDIA GPU support on nodes that run GPU-backed processor images.

CPU, memory, GPU, and disk requirements depend on the selected DAG, models, source rate, and replica count. Size nodes
for the intended workload rather than the control plane alone. The current installation guide uses Kubernetes 1.22.2
with KubeEdge 1.9.2 and requires the matched `dayu-sedna v1.1` and `dayu-edgemesh v1.1` pair.
