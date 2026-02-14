---
sidebar_label: Brief Architecture
sidebar_position: 1
slug: /architecture/brief-architecture
---

# Brief Architecture

Dayu system has a five-layer architecture. Among them, the **basic system layer** and **intermediate interface layer**
form the lower-layer system, mainly containing infrastructure structures that support container orchestration, custom
task deployment, and cross-heterogeneous node communication, providing basic guarantees for stream data processing
applications. The **system support layer**, **collaborative scheduling layer**, and **application service layer** form the upper system, mainly
containing functional components that support context awareness, computational decision-making, and process control,
providing integrated processing, scheduling, and monitoring services for the full process of stream data processing
applications.


![arch](/img/architecture/arch.svg)

Specifically, the detailed functions of each layer are as follows:

- **[Basic System Layer](/docs/architecture/basic-system-layer)**: This layer adopts the KubeEdge container orchestration architecture, deployed on all distributed nodes in the cloud-edge collaboration environment. KubeEdge is an extension of the Kubernetes framework proposed by Huawei for edge scenarios, which can be well deployed on devices with limited resources and low performance, thus establishing a containerized orchestration basic framework on cloud servers and edge nodes.
- **[Intermediate Interface Layer](/docs/architecture/intermediate-interface-layer)**: This layer provides customized container service installation and component communication by modifying and extending the official interface component Sedna and communication component EdgeMesh, thus meeting the application deployment and node communication needs of the overall system.
- **[System Support Layer](/docs/architecture/system-support-layer)**: This layer provides support services for the entire system, including frontend server (providing interactive UI for users), backend server (responding to front-end requests and completing task automatic installation), and datasource server (simulating real data sources).
- **[Collaborative Scheduling Layer](/docs/architecture/collaboration-scheduling-layer)**: This layer is composed of multiple functional components independently developed by us, providing fine-grained operations such as processing, scheduling, and monitoring for stream data processing applications, thus supporting the processing of real-time stream data analysis pipelines.
- **[Application Service Layer](/docs/architecture/application-service-layer)**: This layer receives user-defined service applications in the form of containerized stateless microservices. As long as users develop services according to the unified interface requirements defined by the platform, they can be embedded in the platform in the form of containers and orchestrated into pipelines, thus executing collaborative scheduling between cloud and edge nodes.


