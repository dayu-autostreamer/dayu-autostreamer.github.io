---
sidebar_label: Customize Template Files
slug: /getting-started/start-upper-layer-system/customize-template-files
custom_edit_url: null
---

# Customize Template Files

Dayu system runs based on `template/` directory and the files in it. Before run the system, you should customize the
template files according to your requirements.

Get dayu template files by cloning the dayu repository on the master node (cloud server):

```bash
git clone https://github.com/dayu-autostreamer/dayu.git

cd dayu/template
```

`template/` directory structure is as follows:

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

The table below lists the template files and their functions. For more details about each file format, please refer to
the linked documentation:

| File                       | Function                                                                                                                      | Details                                                                                         | 
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| base.yaml                  | contains basic information of dayu system                                                                                     | [detail formats](/docs/getting-started/start-upper-layer-system/base-template)                  | 
| scheduler_policies.yaml    | contains list of switchable scheduling policies, which is further defined in `scheduler/`                                     | [detail formats](/docs/getting-started/start-upper-layer-system/scheduler-policies-template)    | 
| services.yaml              | contains list of available services, which is further defined in `processor/`                                                 | [detail formats](/docs/getting-started/start-upper-layer-system/services-template)              | 
| result-visualizations.yaml | contains list of visualization modules for task results                                                                       | [detail formats](/docs/getting-started/start-upper-layer-system/result-visualizations-template) | 
| system-visualizations.yaml | contains list of visualization modules for system monitoring                                                                  | [detail formats](/docs/getting-started/start-upper-layer-system/system-visualizations-template) | 
| scheduler/xx.yaml          | define different scheduling policies in different yaml templates, which is switchable in frontend UI after running            | [detail formats](/docs/getting-started/start-upper-layer-system/scheduler-template)             | 
| processor/xx.yaml          | define different services in different yaml templates, which can be orchestrated in frontend UI as applications after running | [detail formats](/docs/getting-started/start-upper-layer-system/processor-template)             | 
| generator/xx.yaml          | define the generator component in yaml template                                                                               | [detail formats](/docs/getting-started/start-upper-layer-system/generator-template)             | 
| controller/xx.yaml         | define the controller component in yaml template                                                                              | [detail formats](/docs/getting-started/start-upper-layer-system/controller-template)            | 
| distributor/xx.yaml        | define the distributor component in yaml template                                                                             | [detail formats](/docs/getting-started/start-upper-layer-system/distributor-template)           |
| monitor/xx.yaml            | define the monitor component in yaml template                                                                                 | [detail formats](/docs/getting-started/start-upper-layer-system/monitor-template)               | 
