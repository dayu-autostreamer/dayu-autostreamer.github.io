---
sidebar_label: 定制模版文件
slug: /getting-started/start-upper-layer-system/customize-template-files
custom_edit_url: null
---

# 定制模版文件

大禹系统基于 `template` 目录及其中的文件运行，在运行系统之前，您应根据需求自定义模板文件。

通过克隆dayu仓库来获取模板文件：

```bash
git clone https://github.com/dayu-autostreamer/dayu.git

cd dayu/templates
```

`template` 目录结构如下：

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

| 文件                         | 功能 | 详情                                                                                    | 
|----------------------------|----|---------------------------------------------------------------------------------------|
| base.yaml                  |    | [详细格式](/docs/getting-started/start-upper-layer-system/base-template)                  | 
| scheduler_policies.yaml    |    | [详细格式](/docs/getting-started/start-upper-layer-system/scheduler-policies-template)    | 
| services.yaml              |    | [详细格式](/docs/getting-started/start-upper-layer-system/services-template)              | 
| result-visualizations.yaml |    | [详细格式](/docs/getting-started/start-upper-layer-system/result-visualizatons-template)  | 
| system-visualizations.yaml |    | [详细格式](/docs/getting-started/start-upper-layer-system/system-visualizations-template) | 
| scheduler/xx.yaml          |    | [详细格式](/docs/getting-started/start-upper-layer-system/scheduler-template)             | 
| processor/xx.yaml          |    | [详细格式](/docs/getting-started/start-upper-layer-system/processor-template)             | 
| generator/xx.yaml          |    | [详细格式](/docs/getting-started/start-upper-layer-system/generator-template)             | 
| controller/xx.yaml         |    | [详细格式](/docs/getting-started/start-upper-layer-system/controller-template)            | 
| distributor/xx.yaml        |    | [详细格式](/docs/getting-started/start-upper-layer-system/distributor-template)           |
| monitor/xx.yaml            |    | [详细格式](/docs/getting-started/start-upper-layer-system/monitor-template)               | 



