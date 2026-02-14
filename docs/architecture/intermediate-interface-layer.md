---
sidebar_label: Intermediate Interface Layer
sidebar_position: 3
slug: /architecture/intermediate-interface-layer
---

# Intermediate Interface Layer


The intermediate interface layer is based on the **KubeEdge** deployment and is responsible for meeting the customized requirements of our dayu system, adapting to the service deployment and node communication required by the dayu system in the form of custom components.

We construct the intermediate interface layer by modifying and extending the official **[service deployment component (Sedna)](https://sedna.readthedocs.io/)** and **[node communication component (EdgeMesh)](https://edgemesh.netlify.app/)**.


![lower-layer-structure.png](/img/architecture/lower-layer-structure.png)

**Sedna:**

Sedna achieves unified service deployment and management on the cloud-edge distributed system by deploying the Global Manager on the master node (cloud server) and deploying the Local Manager on each device (including the cloud server).,

Specifically, the Global Manager is responsible for maintaining cloud-edge customized services, collaborative processing of cloud-edge services, and cloud-edge distributed configuration management, and can extend new cloud-edge collaborative services through the way of customizing CRD. The Local Manager is responsible for maintaining the specific service runtime on each device, which accepts control instructions from the Global Manager to maintain the deployed service components, and manages each service component as a Worker, thus realizing cross-device service maintenance on the distributed system.

It should be noted that in the dayu system, the functional components of the system support layer, collaborative scheduling layer, and application service layer in the upper-level system are all hosted in the form of Workers in Sedna. We customize the implementation of parameter passing and file mounting processes required in the service deployment process of the dayu system by modifying and extending the CRD template and CRD controller in Global Manager and Local Controller **[(Dayu-Customized Sedna)](https://github.com/dayu-autostreamer/dayu-sedna)**.


**EdgeMesh:**

EdgeMesh provides an efficient way for inter-pod communication between different nodes in a cloud-edge distributed collaboration platform by deploying the EdgeMesh Agent on each node. It has features such as efficient routing and automatic load balancing, making it suitable for cross-device communication in large-scale cloud-edge scenarios.

In response to the requirements of the dayu system, we customized the load balancing algorithm strategy in the EdgeMesh Agent, transforming it from the original simple round-robin polling of all devices to load balancing for multiple pods on specific target devices, thereby meeting the communication needs of the upper-level system **[(Dayu-Customized EdgeMesh)](https://github.com/dayu-autostreamer/dayu-edgemesh)**.
