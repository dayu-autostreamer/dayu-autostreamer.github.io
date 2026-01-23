---
sidebar_label: Services Template
slug: /getting-started/start-upper-layer-system/services-template
custom_edit_url: null
unlisted: true
displayed_sidebar: null
hide_table_of_contents: true
---

# services.yaml

`services.yaml` defines the available services in the system.
Each service includes its unique ID, name, description, input and output data types, and a reference to its specific
configuration file.

These pre-defined services can be orchestrated in the `DAG Orchestration` page of frontend UI to build complex applications after running system.

```yaml
# A list of services available in the system. 
# Each services will be decorated in a processor container in the upper layer system.

- id: car-detection  # Unique identifier for the service.
  service: car-detection  # Real invoking service related to images in "https://hub.docker.com/u/dayuhub" or code in "dependency/core/applications"
  name: car detection  # Human-readable name of the service.
  description: car detection (detection + tracking)  # Description of the service.
  input: frame  # Input data type for the service.
  output: bbox  # Output data type for the service.
  yaml: car-detection.yaml  # YAML defining the service, included in 'processor/' directory

- id: license-plate-recognition
  service: license-plate-recognition
  name: license plate recognition
  description: license plate recognition
  input: bbox
  output: text
  yaml: license-plate-recognition.yaml

# ......
```

The input/output data types defined in services are required to be consistent when orchestrating different services into
dag-structured applications (the output of one service is the input of the next service).
