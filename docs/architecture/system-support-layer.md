---
sidebar_label: System Support Layer
sidebar_position: 4
slug: /architecture/system-support-layer
---

# System Support Layer

The system support layer provides functional support services for the dayu system, thus meeting the direct needs of
users.
Specifically, the system support layer consists of **frontend server**, **backend server**, and **datasource server**.

- **[Frontend Server](https://github.com/dayu-autostreamer/dayu/tree/main/frontend)** has built an interactive web-based
  frontend interface with VUE. After launching the dayu system, users can directly access the frontend page, and
  complete all operation processes through the buttons provided on the frontend page.

- **[Backend Server](https://github.com/dayu-autostreamer/dayu/tree/main/backend)** is responsible for interacting with
  the frontend, building HTTP responsive services through Fastapi, providing real-time and specific responses for users'
  operations on the frontend page, including providing basic service data, installing functional components, and
  returning task execution result data, etc.

- **[Datasource Server](https://github.com/dayu-autostreamer/dayu/tree/main/datasource)** provides a simulated data
  source for users' stream data processing applications. In non-real simulation scenarios or test scenarios, the lack of
  a real-time stream datasource (such as a real camera) often leads to the system behavior and effects deviating from
  real scenarios. Therefore, in the dayu system, we build an optional datasource server to provide
  functions of various stream datasource generators including RTSP and HTTP, covering different types of datasources
  in real-world scenarios.
