---
sidebar_label: Result Visualizations Template
slug: /getting-started/start-upper-layer-system/result-visualizations-template
custom_edit_url: null
unlisted: true
displayed_sidebar: null
hide_table_of_contents: true
---

# result_visualizations.yaml

`result_visualizations.yaml` is used to configure the visualization modules for task results in the system.
Each module corresponds to a specific visualization displayed on the `Result Visualization` page in frontend UI.

```yaml
# A list of visualization modules for task results.

# A visualization module
- name: Frame Visualization  # Name of the visualization module
  type: image  # Type of visualization (support 'image', 'curve', 'topology', 'cdf')
  variables: [ "Frame with Regions of Interest" ]  # List of variables, can be used as 'self.variables' in hook function
  hook_name: roi_frame  # Hook function name to fetch data, related to code in 'dependency/core/lib/result_visualizer'
  save_expense: true  # Whether to , default is false
  size: 1  # Display size (support 1,2,3), the total size of a line is 3

- name: DAG Service Offloading
  type: topology
  variables: [ "Realtime DAG Service Offloading State" ]
  hook_name: dag_offloading
  save_expense: true
  size: 2

- name: End to End Delay Curve
  type: curve
  x_axis: Task Index  # x_axis label, only for 'curve' and 'cdf' types
  y_axis: Delay  # y_axis label, only for 'curve' and 'cdf' types
  variables: [ "End to End Delay" ]
  hook_name: e2e_delay
  size: 1

- name: DAG Service Deployment
  type: topology
  variables: [ "Realtime DAG Service Deployment State" ]
  hook_name: dag_deployment
  save_expense: true
  size: 2

- name: Object Number Curve
  type: curve
  x_axis: Task Index
  y_axis: Number
  variables: [ "Object Number" ]
  hook_name: obj_num
  size: 1

- name: End to End Delay CDF
  type: cdf
  x_axis: Delay
  y_axis: CDF
  variables: [ "End to End Delay" ]
  hook_name: e2e_delay
  size: 1

# ......
```