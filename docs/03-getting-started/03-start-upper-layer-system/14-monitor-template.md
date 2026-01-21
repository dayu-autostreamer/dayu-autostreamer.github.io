---
sidebar_label: Monitor Template
slug: /getting-started/start-upper-layer-system/monitor-template
custom_edit_url: null
unlisted: true
---

# Template in monitor/

```yaml
position: both
pod-template:
  image: monitor
  imagePullPolicy: Always
  env:
    - name: INTERVAL
      value: "5"
    - name: MONITORS
      value: >
        ['memory_capacity','cpu_usage', 'memory_usage', 'gpu_usage', 'available_bandwidth',  'gpu_flops', 'model_flops', 'model_memory','queue_length']
port-open:
  pos: cloud
  port: 9000
```


