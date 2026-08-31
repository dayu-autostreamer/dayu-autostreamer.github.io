---
sidebar_label: Run Dayu System
sidebar_position: 4
slug: /getting-started/start-upper-layer-system/run-dayu-system
---

# Run Dayu System

## Start the support layer

Run the script from the repository root:

```bash
TEMPLATE=template ACTION=start bash dayu.sh
```

The command starts Backend, Frontend, Datasource, and Redis. It does not install the selected scheduler policy or
application DAG. Open the Frontend URL printed by the script, then complete the application installation workflow.

To stop Dayu:

```bash
TEMPLATE=template ACTION=stop bash dayu.sh
```

The stop command first asks Backend to stop the active query and application runtime, then completes support-layer
cleanup. Runtime uninstall is asynchronous: the frontend and `GET /install_state` may show cancellation, uninstall, or
finalization phases while exact RuntimeService-owned objects are being removed.

## Operate in the frontend

### Open the home page

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/02-home-page.mp4" type="video/mp4" />
</video>

### Orchestrate the task DAG

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/03-dag-orchestration.mp4" type="video/mp4" />
</video>

### Configure the source

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/04-source-configuration.mp4" type="video/mp4" />
</video>

### Install the application runtime

Choose a policy, datasource, DAG, and allowed nodes. The page remains in progress until Backend commits an active
RuntimeDirectory. If installation is cancelled or fails after resources were created, use the same page to complete
cleanup before starting another installation.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/05-application-installation.mp4" type="video/mp4" />
</video>

### View result visualization

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/06-result-visualization.mp4" type="video/mp4" />
</video>

### View system visualization

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/07-system-visualization.mp4" type="video/mp4" />
</video>
