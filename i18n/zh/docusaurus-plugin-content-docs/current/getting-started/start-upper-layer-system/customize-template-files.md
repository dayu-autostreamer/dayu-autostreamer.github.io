---
sidebar_label: 定制模版文件
sidebar_position: 2
slug: /getting-started/start-upper-layer-system/customize-template-files
---

# 定制模版文件

大禹系统基于 `template/` 目录及其中的文件运行，在运行系统之前，您应根据需求自定义模板文件。

通过克隆dayu仓库来获取模板文件：

```bash
git clone https://github.com/dayu-autostreamer/dayu.git

cd dayu/template
```

`template/` 目录结构如下：

```text
template/
├── base.yaml
├── scheduler_policies.yaml
├── services.yaml
├── result-visualizations.yaml
├── system-visualizations.yaml
├── scheduler/
│ ├── fixed-policy.yaml
│ ├── hei.yaml
│ └── ...
├── processor/
│ ├── age-classification.yaml
│ ├── pedestrian-detection.yaml
│ └── ...
├── generator/
│ ├── generator-base.yaml
│ └── ...
├── controller/
│ ├── controller-base.yaml
│ └── ...
├── distributor/
│ ├── distributor-base.yaml
│ └── ...
└── monitor/
  ├── monitor-base.yaml
  └── ...
```

下表列出了模板文件及其功能，有关每个文件格式的更多详细信息，请参阅链接的文档：

| 文件                         | 功能                                  | 详情                                                                                    | 
|----------------------------|-------------------------------------|---------------------------------------------------------------------------------------|
| base.yaml                  | 包含大禹系统的基本信息                         | [详细格式](/docs/getting-started/start-upper-layer-system/base-template)                  | 
| scheduler_policies.yaml    | 包含可切换的调度策略列表，该列表在`scheduler/`中进一步定义 | [详细格式](/docs/getting-started/start-upper-layer-system/scheduler-policies-template)    | 
| services.yaml              | 包含可用服务列表，该列表在`processor/`中进一步定义     | [详细格式](/docs/getting-started/start-upper-layer-system/services-template)              | 
| result-visualizations.yaml | 包含任务结果的可视化模块列表                      | [详细格式](/docs/getting-started/start-upper-layer-system/result-visualizations-template) | 
| system-visualizations.yaml | 包含系统监控的可视化模块列表                      | [详细格式](/docs/getting-started/start-upper-layer-system/system-visualizations-template) | 
| scheduler/*.yaml           | 在不同的yaml模板中定义不同的调度策略，运行后在前端UI中可切换   | [详细格式](/docs/getting-started/start-upper-layer-system/scheduler-template)             | 
| processor/*.yaml           | 在不同的yaml模板中定义不同的服务，运行后可以在前端UI中编排成应用 | [详细格式](/docs/getting-started/start-upper-layer-system/processor-template)             | 
| generator/*.yaml           | 在yaml模板中定义 generator 组件             | [详细格式](/docs/getting-started/start-upper-layer-system/generator-template)             | 
| controller/*.yaml          | 在yaml模板中定义 controller 组件            | [详细格式](/docs/getting-started/start-upper-layer-system/controller-template)            | 
| distributor/*.yaml         | 在yaml模板中定义 distributor 组件           | [详细格式](/docs/getting-started/start-upper-layer-system/distributor-template)           |
| monitor/*.yaml             | 在yaml模板中定义 monitor 组件               | [详细格式](/docs/getting-started/start-upper-layer-system/monitor-template)               | 
 

