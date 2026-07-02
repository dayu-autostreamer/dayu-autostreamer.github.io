---
slug: version1.3
title: Dayu v1.3 Released
authors: [whzhou, sycao]
tags: [release]
---

**Dayu system Version 1.3 is released!**

<!-- truncate -->


### Features
- Add our work on deployment and offloading: Hedger, a hierarchical scheduling framework for macro-level service deployment and micro-level task offloading. It uses dual-agent with GNNs and DRLs to make accurate and feasible decisions. [(link)](https://github.com/dayu-autostreamer/dayu/tree/v1.3/template/scheduler/hedger.yaml)
- Add our work on configuration optimization: Steady Scheduler, a configuration selection framework for steady scheduling. It uses side-effect to shrink search space and adapt to context fluctuations. [(link)](https://github.com/dayu-autostreamer/dayu/tree/v1.3/template/scheduler/steady.yaml)

### Bug Fix
- Fix iptables rule accumulation for edgemesh in incorrect dayu shutdowns with `dayu.sh` script correction.
- Separate task temporary directory for different users (`controller`/`processor`).
- Fix incompatibility of real cameras in rtsp video datasource (`generator`/`backend`).
- Change defualt redeployment plan from full-deployment to raw deployment (`backend`).

### Minor Update
- Update log export mode to support large logs in multi-stream scenarios (`backend`/`distributor`).
- Change storage mode of http video datasource from video frame to video to avoid disk occupation (`datasource`).
- Reconstruct the dataset format for datasource to support more flexible video data organization and processing (`datasource`).
- Change generator selection scope to optional for node set or all edge nodes (`backend`/`scheduler`).
- Update file mount to be compatible with different deployment environments.
- Optimize the frontend interfaces of dayu system (`frontend`/`backend`).


For more details, please refer to [dayu-v1.3](https://github.com/dayu-autostreamer/dayu/releases/tag/v1.3).

