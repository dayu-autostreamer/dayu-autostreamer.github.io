---
sidebar_label: System Visualizations Template
slug: /getting-started/start-upper-layer-system/system-visualizations-template
custom_edit_url: null
unlisted: true
---

# system_visualizations.yaml

```yaml
- name: CPU Usage
  type: curve
  x_axis: Time
  y_axis: Usage (%)
  variables: []
  hook_name: cpu_usage
  size: 1
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
```