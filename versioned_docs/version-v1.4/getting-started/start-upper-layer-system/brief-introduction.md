---
sidebar_label: Brief Introduction
sidebar_position: 1
slug: /getting-started/start-upper-layer-system/brief-introduction
---

# Start Upper-Layer System

## Introduction

Dayu's upper-layer system has two lifecycle scopes:

- the support layer contains Backend, Frontend, Datasource, and Redis and is started by `dayu.sh`;
- the application runtime contains Scheduler, Generator, Controller, Processor, Distributor, and Monitor
  RuntimeServices and is installed from the frontend or Backend API.

Starting the support layer does not install a scheduler policy or application DAG. This separation lets operators
change or remove an application runtime without rebuilding the lower-layer cluster.

## Start process

1. [Customize template files](/docs/v1.4/getting-started/start-upper-layer-system/customize-template-files).
2. [Deploy mounted files](/docs/v1.4/getting-started/start-upper-layer-system/deploy-mounted-files).
3. [Run Dayu system](/docs/v1.4/getting-started/start-upper-layer-system/run-dayu-system).

Before starting, confirm the lower-layer system is healthy and the registry and mounted paths in `template/base.yaml`
are reachable from every selected node.
