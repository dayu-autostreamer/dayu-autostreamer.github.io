---
slug: version1.1
title: Dayu v1.1 Released
authors: [whzhou, haowu, adayang, wydai]
---

Dayu system Version 1.1 is released!

### Breaking Changes
The basic structure of tasks in dayu is updated from linear pipeline to topological dag (directed acyclic graph) to support more complicated application scenarios.

### Features
- A brand-new forwarding mechanism in the dayu system for tasks with dag structure, including splitting nodes with forking and merging nodes with redis.
- A fine-grained and flexible deployment and offloading mechanism for topological logic nodes and physical nodes, which separates the process of model deployment and task offloading and allows collaboration among multi-edges and cloud.
- A more flexible visualization module in frontend to display customized visualization views for system analysis.
- Add our work on model evolution, adaptively switch models based on scenarios. [(link)](https://github.com/dayu-autostreamer/dayu/template/scheduler/model-switch.yaml)
- Add our latest work on video encoding: CRAVE (Collaborative Region-aware Adaptive Video Encoding). It is a region-adaptive video encoding algorithm for cloud-edge collaborative object detection. [(link)](https://github.com/dayu-autostreamer/dayu/template/scheduler/crave.yaml)

### Bug Fix
- Fix problem of write queue full in rtsp datasource server (`datasource`).
- Fix possible task loss in the system (`controller` / `distributor`).
- Add optional cloud/edge parameters filling in template files for flexible parameter specification in cloud-edge pods.

### Minor Update
- Add cloud and edge template supplementary to support heterogeneous parameters (`backend`).
- Beatify frontend pages (`frontend`).
- Refactor template directory to simplify file structure.
- Unify the base image for system components. 
- Add application of age classification. (Current available applications: car-detection, face-detection, gender-classification, age-classification)


For more details, please refer to [dayu-v1.1](https://github.com/dayu-autostreamer/dayu/releases/tag/v1.1).

