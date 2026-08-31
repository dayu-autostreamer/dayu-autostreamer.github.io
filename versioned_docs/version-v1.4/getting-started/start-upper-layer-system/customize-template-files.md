---
sidebar_label: Customize Template Files
sidebar_position: 2
slug: /getting-started/start-upper-layer-system/customize-template-files
---

# Customize Template Files

Dayu composes each installation from the YAML files under `template/`. Clone the system repository on the cloud node and
edit a copy of this directory for the target deployment:

```bash
git clone https://github.com/dayu-autostreamer/dayu.git
cd dayu/template
```

The main layout is:

```text
template/
├── base.yaml
├── scheduler_policies.yaml
├── services.yaml
├── result-visualizations.yaml
├── system-visualizations.yaml
├── scheduler/
├── processor/
├── generator/
├── controller/
├── distributor/
└── monitor/
```

## Catalog and system files

| File | Purpose | Reference |
| --- | --- | --- |
| `base.yaml` | Namespace, Backend RBAC, runtime timeouts, images, mounts, datasource mode, and catalog imports. | [Base Template](/docs/v1.4/getting-started/start-upper-layer-system/base-template) |
| `scheduler_policies.yaml` | Installable policy catalog and each policy's component-template dependencies. | [Scheduler Policies](/docs/v1.4/getting-started/start-upper-layer-system/scheduler-policies-template) |
| `services.yaml` | DAG service catalog and processor-template mapping. | [Services](/docs/v1.4/getting-started/start-upper-layer-system/services-template) |
| `result-visualizations.yaml` | Task-result visualization modules. | [Result Visualizations](/docs/v1.4/getting-started/start-upper-layer-system/result-visualizations-template) |
| `system-visualizations.yaml` | Runtime and resource visualization modules. | [System Visualizations](/docs/v1.4/getting-started/start-upper-layer-system/system-visualizations-template) |

## Component templates

Files under `scheduler/`, `processor/`, `generator/`, `controller/`, `distributor/`, and `monitor/` are logical component
templates. Backend combines the selected policy, DAG, source, nodes, image defaults, and mounted files, then renders
immutable Sedna `RuntimeService` resources. These templates are no longer converted into one application
`JointMultiEdgeService`.

| Template | Role | Reference |
| --- | --- | --- |
| common fields | Position, image, environment, port, cloud/edge overlays, and host-path mounts. | [Common Template](/docs/v1.4/getting-started/start-upper-layer-system/common-template) |
| `scheduler/*.yaml` | Scheduler hook selection and policy parameters. | [Scheduler Template](/docs/v1.4/getting-started/start-upper-layer-system/scheduler-template) |
| `processor/*.yaml` | AI service image, processor family, queue, model parameters, and files. | [Processor Template](/docs/v1.4/getting-started/start-upper-layer-system/processor-template) |
| `generator/*.yaml` | Source-processing and scheduling-request hooks. | [Generator Template](/docs/v1.4/getting-started/start-upper-layer-system/generator-template) |
| `controller/*.yaml` | Task forwarding behavior. | [Controller Template](/docs/v1.4/getting-started/start-upper-layer-system/controller-template) |
| `distributor/*.yaml` | Result persistence and export service. | [Distributor Template](/docs/v1.4/getting-started/start-upper-layer-system/distributor-template) |
| `monitor/*.yaml` | Resource and queue-state monitor sets. | [Monitor Template](/docs/v1.4/getting-started/start-upper-layer-system/monitor-template) |

Backend validates catalog references, node permissions, deployment plans, ports, mounts, and effective environment
before route publication. Keep policy-specific model or profile assets under the mounted paths expected by that
template.
