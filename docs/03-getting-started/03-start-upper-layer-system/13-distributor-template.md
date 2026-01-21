---
sidebar_label: Distributor Template
slug: /getting-started/start-upper-layer-system/distributor-template
custom_edit_url: null
unlisted: true
displayed_sidebar: null
---

# Template in distributor/


```yaml
position: cloud
pod-template:
  image: distributor
  imagePullPolicy: Always
  env:
port-open:
  pos: cloud
  port: 9000
```


