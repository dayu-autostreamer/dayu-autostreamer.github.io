---
sidebar_label: Generator Template
slug: /getting-started/start-upper-layer-system/generator-template
custom_edit_url: null
unlisted: true
---

# Generator Template

[TBD]

```yaml
position: edge
pod-template:
  image: generator
  imagePullPolicy: Always
  env:
    - name: GEN_FILTER_NAME
      value: simple
    - name: GEN_GETTER_FILTER_NAME
      value: simple
    - name: GEN_PROCESS_NAME
      value: simple
    - name: GEN_COMPRESS_NAME
      value: simple
    - name: GEN_BSO_NAME
      value: simple
    - name: GEN_BSTO_NAME
      value: simple
    - name: GEN_ASO_NAME
      value: simple
    # interval in source seconds to schedule requests (e.g, 1 request for 1s video), 0 for request at each task
    - name: REQUEST_SCHEDULING_INTERVAL
      value: "1"
```


