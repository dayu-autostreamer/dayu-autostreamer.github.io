---
sidebar_label: Intermediate Interface Layer
sidebar_position: 3
slug: /architecture/intermediate-interface-layer
---

# Intermediate Interface Layer

The intermediate interface layer adapts the KubeEdge cluster to Dayu's runtime deployment and communication model. The
current system uses the matched [dayu-sedna v1.1](https://github.com/dayu-autostreamer/dayu-sedna/tree/v1.1) and
[dayu-edgemesh v1.1](https://github.com/dayu-autostreamer/dayu-edgemesh/tree/v1.1) releases.

![Lower-layer structure](/img/architecture/lower-layer-structure.png)

## Sedna runtime services

`dayu.sh` uses the configured Sedna support CRD to start the long-lived platform services. Application runtime workers
are different: Backend renders Scheduler, Generator, Controller, Processor, Distributor, and Monitor instances as
immutable `sedna.io/v1alpha1` `RuntimeService` resources.

Sedna Global Manager and Local Controller coordinate each runtime revision. Backend does not publish a worker until
Sedna reports the expected specification and exact RuntimeService, Service, and Pod identities with both
`Activated=True` and `Ready=True`. This prevents a running but unroutable Pod from entering the active runtime.

## EdgeMesh routing

EdgeMesh provides service communication across cloud and edge nodes. The Dayu integration acknowledges the exact
Service and Pod identity created for a RuntimeService, rather than treating workload creation alone as readiness.
Scheduler records the acknowledged endpoints in a versioned `RuntimeDirectory`, and runtime tasks carry only those
exact routes.

Runtime workers do not list Kubernetes objects, refresh a topology cache, or choose a replacement route. Kubernetes
access belongs to Backend; route authority belongs to Scheduler. Missing or stale route identity is therefore reported
as an error instead of silently falling back to another replica.
