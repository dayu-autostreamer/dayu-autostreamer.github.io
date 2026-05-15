---
sidebar_label: Run Dayu System
sidebar_position: 4
slug: /getting-started/start-upper-layer-system/run-dayu-system
---

# Run Dayu System

This page shows how to start the Dayu system and complete a basic workflow from the frontend UI. The videos below are silent screen recordings and can be played directly on this page.

## Workflow Preview

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/01-cover.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Run Starting Script

Dayu system can be started and stopped with the provided script `dayu.sh`:

```bash
cd dayu

# Start dayu system with script
ACTION=start TEMPLATE=template/ bash - dayu.sh

# Stop dayu system with script
ACTION=stop TEMPLATE=template/ bash - dayu.sh
```

## Operate on Frontend UI

After the backend services are running, open the Dayu frontend and complete the workflow in the following order.

### Open Home Page

Use the home page to confirm that the frontend is reachable and that the system entry points are available.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/02-home-page.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Orchestrate the Task DAG

Create or adjust the task DAG to describe how data sources, applications, and downstream processing modules are connected.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/03-dag-orchestration.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Configure the Source

Set the source configuration so that Dayu can read the input stream or dataset used by the workflow.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/04-source-configuration.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Install Applications

Select and install the required applications for the current workflow.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/05-application-installation.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### View Result Visualization

Open the result visualization page to inspect the application output.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/06-result-visualization.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### View System Visualization

Use the system visualization page to check the running topology and service status.

<video controls preload="metadata" muted playsInline width="100%">
  <source src="/video/run-dayu-system/07-system-visualization.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
