---
sidebar_label: System Support Layer
sidebar_position: 4
slug: /architecture/system-support-layer
---

# System Support Layer

[TBD]

[//]: # (The system support layer provides functional support services for the dayu system, thus completing the connection with the direct needs of users.)

[//]: # ()
[//]: # (Specifically, the system support layer consists of **frontend server**, **backend server**, and **datasource server**.)

系统支撑层为大禹调度系统提供面向用户的功能性支撑服务，从而完成对用户直接需求的对接。
具体来说，系统支撑层由**前端服务器**、**后端服务器**和**数据源服务器**组成。

**前端服务器**使用VUE语言构建了一个可交互的网页式前端界面，在启动大禹调度系统后，用户可以直接访问前端页面，
通过前端页面提供的按钮完成所有操作流程。

**后端服务器**负责与前端交互，通过Fastapi构建HTTP响应式服务，
为用户在前端页面上的操作提供实时具体的响应，包括提供基础服务数据、安装功能组件、回传任务执行结果数据等。

**数据源服务器**为用户的流数据处理应用提供模拟数据源.在非真实的仿真场景或测试场景中，
缺少真实流数据源（如真实摄像头）往往会导致系统行为和效果无法完全模拟真实场景，
因此大禹调度系统中我们通过构建可选的数据源服务器，提供包括RTSP、HTTP在内的多种流数据源发生器的功能，覆盖真实场景下不同类型的数据源。

[//]: # (- **Frontend Server** has built an interactive web-based front-end interface using the VUE language. After launching the dayu system, users can directly access the front-end page, and complete all operation processes through the buttons provided on the front-end page.)

[//]: # ()
[//]: # (- **Backend Server** is responsible for interacting with the front-end, building HTTP responsive services through Fastapi, providing real-time and specific responses for users' operations on the front-end page, including providing basic service data, installing functional components, and returning task execution result data, etc.)

[//]: # ()
[//]: # (- **Datasource Server** provides a simulated data source for users' stream data processing applications. In non-real simulation scenarios or test scenarios, the lack of a real-time stream data source &#40;such as a real camera&#41; often leads to the system behavior and effects being unable to fully simulate real scenarios. Therefore, in the dayu system, we build an optional data source server to provide functions of various stream data source generators including RTSP and HTTP, covering different types of data sources in real-world scenarios.)
