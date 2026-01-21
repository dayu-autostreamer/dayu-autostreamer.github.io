---
sidebar_label: Controller Template
slug: /getting-started/start-upper-layer-system/controller-template
custom_edit_url: null
unlisted: true
---

# Template in controller/

```yaml
position: both
pod-template:
  image: controller
  imagePullPolicy: Always
  env:
    # whether display raw data on frontend (transmit files to cloud)
    - name: DISPLAY
      value: "True"
    # whether delete temporary raw data files (no delete only for debug, please don't use in production)
    - name: DELETE_TEMP_FILES
      value: "True"
port-open:
  pos: both
  port: 9000
```





