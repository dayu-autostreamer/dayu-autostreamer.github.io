---
sidebar_label: System Visualizations Template
slug: /getting-started/start-upper-layer-system/system-visualizations-template
custom_edit_url: null
unlisted: true
displayed_sidebar: null
hide_table_of_contents: true
---

# system_visualizations.yaml

`system_visualizations.yaml` is used to configure the visualization modules for system monitoring in the system. 
Each module corresponds to a specific visualization displayed on the `System Visualization` page in frontend UI.

```yaml
# A list of visualization modules for system monitoring.

# A visualization module
- name: CPU Usage  # Name of the visualization module
  type: curve  # Type of visualization (support 'image', 'curve', 'topology', 'cdf')
  x_axis: Time  # x_axis label, only for 'curve' and 'cdf' types
  y_axis: Usage (%)  # y_axis label, only for 'curve' and 'cdf' types
  variables: []  # List of variables, can be used as 'self.variables' in hook function
  hook_name: cpu_usage  # Hook function name to fetch data, related to code in 'dependency/core/lib/system_visualizer'
  size: 1  # Display size (support 1,2,3), the total size of a line is 3
  
- name: Memory Usage
  type: curve
  x_axis: Time
  y_axis: Usage (%)
  variables: []
  hook_name: memory_usage
  size: 1
  
- name: Scheduling Overhead
  type: curve
  x_axis: Time
  y_axis: Overhead (ms)
  variables: [ "Overhead" ]
  hook_name: schedule_overhead
  size: 1

# ......
```