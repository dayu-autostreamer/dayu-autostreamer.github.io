---
slug: version1.2
title: Dayu v1.2 Released
authors: [whzhou, hysu]
tags: [release]
---

**Dayu system Version 1.2 is released!**

<!-- truncate -->

### Features
- Add a cyclic redeployment mechanism of service processors for further flexible task processing.
- Add new services to construct a logical topology, including pedestrian-detection, vehicle-detection, 
exposure-identification, category-classification and license-plate-recognition.

### Bug Fix
- Fix concurrency conflicts for starting up multiple streams in rtsp video and http video (`datasource`).
- Fix frame index updating error in http video source (`datasource`).
- Fix port occupation bug of rtsp video datasource after shutting down (`datasource`).
- Support dynamic variable update in visualization modules (`frontend`).
- Support cloud-only deployment of processors (`backend`).
- Fix task forwarding bug in inconsistent deployment and offloading decisions (`controller`).
- Fix possible database locking in concurrency access of distributor (`distributor`).
- Add cache TTL of Kubernetes configurations to avoid additional expense in `PortInfo` and `KubeConfig`.

### Minor Update
- Update more flexible visualization modules to switch different user-defined configurations in multi-stream scenarios (`frontend` / `backend`).
- Clean up frontend code and beatify frontend pages (`frontend`).
- Add persistent storage of installation configuration (`frontend`).
- Add system visualization to monitor system parameters, including resource usage, scheduling cost and so on (`frontend` / `backend` / `scheduler`).
- Improving a fine-grained monitoring architecture including monitoring cpu and gpu flops (`monitor`).
- Add 'USE_TENSORRT' option in processors to choose whether using tensorrt mode (`processor`).
- Add model flops calculation in processors to support model flops monitoring (`processor`).
- Update 'ImagePullPolicy' in template files from 'IfNotPresent' to 'Always' to ensure pulling the latest images.
- Update detailed overhead time statistics in scheduling logs (`scheduler`).
- Accelerate backend visualization through caching mechanism (`backend`).
- Add ROI ID to detection/tracking applications to support roi-accelerated classification applications (`processor`).
- Add ROI Classifier to accelerate roi-level classification applications (`processor`).
- Optimize local service processor by sharing temporary directory on local devices (`controller`/`processor`).
- Add adjustable request scheduling interval in generator to avoid frequent scheduling (`generator`).
- Add temporary file cleaning mechanism in local controller to avoid disk occupation (`controller`).
- Add compatible docker image building for jp4/jp5/jp6 for processor in Nvidia Jetson devices (`processor`/`monitor`).
- Update scenario data structure and processing (`processor`).


For more details, please refer to [dayu-v1.2](https://github.com/dayu-autostreamer/dayu/releases/tag/v1.2).

