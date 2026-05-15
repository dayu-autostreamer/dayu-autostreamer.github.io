---
sidebar_label: Deploy Mounted Files
sidebar_position: 3
slug: /getting-started/start-upper-layer-system/deploy-mounted-files
---

# Deploy Mounted Files

Dayu system requires deploying files to support mounting of component containers.

Download files from [mounted files link](https://box.nju.edu.cn/d/300d99fd77b049908606), it has the following structure:

```text
dayu-deploy-files/
|-- cloud-deploy-files/
|   `-- dayu-files/
|       |-- acc-gt-dense/
|       |   |-- car-detection/
|       |   `-- face-detection/
|       |-- acc-gt-sparse/
|       |   |-- car-detection/
|       |   `-- face-detection/
|       |-- processor/
|       |   |-- age-classification/
|       |   |-- car-detection/
|       |   |-- category-identification/
|       |   |-- exposure-identification/
|       |   |-- face-detection/
|       |   |-- gender-classification/
|       |   |-- license-plate-recognition/
|       |   |-- model-switch-detection/
|       |   |-- pedestrian-detection/
|       |   `-- vehicle-detection/
|       `-- scheduler/
|           `-- fixed/
|-- datasource-deploy-files/
|   `-- datasource/
|       `-- video/
|           |-- road_0/
|           |-- road_1/
|           |-- road_dense/
|           |-- road_sparse/
|           |-- street_0/
|           |-- street_dense/
|           `-- street_sparse/
|-- edge-deploy-files/
|   `-- dayu-files/
|       |-- generator/
|       |   `-- adaptive/
|       `-- processor/
|           |-- age-classification/
|           |-- car-detection/
|           |-- category-identification/
|           |-- exposure-identification/
|           |-- face-detection/
|           |-- gender-classification/
|           |-- license-plate-recognition/
|           |-- model-switch-detection/
|           |-- pedestrian-detection/
|           `-- vehicle-detection/
`-- tensorrt-application-files/
    |-- age-classification/
    |-- car-detection/
    |-- category-identification/
    |-- exposure-identification/
    |-- face-detection/
    |-- gender-classification/
    |-- license-plate-recognition/
    |-- pedestrian-detection/
    `-- vehicle-detection/
```

## Deploy to Nodes

The default mount paths are configured in `template/base.yaml`:

```yaml
default-file-mount-prefix: "/data/dayu-files"
datasource:
  data-root: "/data/datasource/"
```

If you keep the default values, deploy the downloaded files as follows:

| Downloaded directory                         | Target node                                      | Target path         | Usage                                                                 |
|----------------------------------------------|--------------------------------------------------|---------------------|-----------------------------------------------------------------------|
| `cloud-deploy-files/dayu-files/`             | Cloud node                                       | `/data/dayu-files/` | Files mounted by cloud-side processors and schedulers.                |
| `edge-deploy-files/dayu-files/`              | Each edge node that may run Dayu components      | `/data/dayu-files/` | Files mounted by edge-side processors and generators.                 |
| `datasource-deploy-files/datasource/`        | Edge node configured by `datasource.node`        | `/data/datasource/` | Video files used by the simulated datasource when it is enabled.      |
| `tensorrt-application-files/<application>/`  | Optional source files for cloud and edge nodes   | See below           | Platform-specific TensorRT engines used when replacing model files.   |

For example, with the default paths, `processor/car-detection/` in a processor template is resolved to
`/data/dayu-files/processor/car-detection/` on the node where the processor runs. Make sure that the corresponding
directory exists on both cloud and edge nodes if a template uses `position: both`.

## TensorRT Application Files

`cloud-deploy-files` and `edge-deploy-files` already contain model files that match the default cloud and edge
deployment. `tensorrt-application-files` is provided for replacing or preparing TensorRT engine files for different
hardware platforms. Each application directory is grouped by platform:

```text
tensorrt-application-files/<application>/
|-- cloud/
|-- jp4-tx2/
|-- jp4-xavier-nx/
|-- jp5-agx-xavier/
`-- jp6-orin-nano/
```

Select the platform directory that matches the target node, then copy the engine files into the same application
directory under `/data/dayu-files/processor/`. For example, the cloud-side files for `car-detection` should be placed in
`/data/dayu-files/processor/car-detection/` on the cloud node, while the JetPack 4 TX2 files should be placed in the
same relative path on the corresponding TX2 edge node.

If you change `default-file-mount-prefix` or `datasource.data-root` in `template/base.yaml`, deploy the files to the
new paths instead of the default paths shown above.
