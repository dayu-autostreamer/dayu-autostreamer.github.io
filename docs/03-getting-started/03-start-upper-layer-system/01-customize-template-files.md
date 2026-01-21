---
sidebar_label: Customize Template Files
slug: /getting-started/start-upper-layer-system/customize-template-files
custom_edit_url: null
---

# Customize Template Files

Dayu system runs based on `template` directory and the files in it. Before run the system, you should customize the template files according to your requirements.

Get dayu template files by cloning the dayu repository:
```bash
git clone https://github.com/dayu-autostreamer/dayu.git

cd dayu/templates
```

`template` directory structure is as follows:
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

The table below lists the template files and their functions. For more details about each file format, please refer to the linked documentation:

| File                       | Function | Details                                                                                         | 
|----------------------------|----------|-------------------------------------------------------------------------------------------------|
| base.yaml                  |          | [detail formats](/docs/getting-started/start-upper-layer-system/base-template)                  | 
| scheduler_policies.yaml    |          | [detail formats](/docs/getting-started/start-upper-layer-system/scheduler-policies-template)    | 
| services.yaml              |          | [detail formats](/docs/getting-started/start-upper-layer-system/services-template)              | 
| result-visualizations.yaml |          | [detail formats](/docs/getting-started/start-upper-layer-system/result-visualizatons-template)  | 
| system-visualizations.yaml |          | [detail formats](/docs/getting-started/start-upper-layer-system/system-visualizations-template) | 
| scheduler/xx.yaml          |          | [detail formats](/docs/getting-started/start-upper-layer-system/scheduler-template)             | 
| processor/xx.yaml          |          | [detail formats](/docs/getting-started/start-upper-layer-system/processor-template)             | 
| generator/xx.yaml          |          | [detail formats](/docs/getting-started/start-upper-layer-system/generator-template)             | 
| controller/xx.yaml         |          | [detail formats](/docs/getting-started/start-upper-layer-system/controller-template)            | 
| distributor/xx.yaml        |          | [detail formats](/docs/getting-started/start-upper-layer-system/distributor-template)           |
| monitor/xx.yaml            |          | [detail formats](/docs/getting-started/start-upper-layer-system/monitor-template)               | 
