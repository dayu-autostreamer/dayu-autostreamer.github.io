---
sidebar_label: Application Service Layer
sidebar_position: 6
slug: /architecture/application-service-layer
---

# Application Service Layer

The application service layer customizes specific application processing logic according to user needs, thereby providing an upper-level logical application representation to the dayu system.

Specifically, user needs can be transformed into an application pipeline composed of one or more stages of AI processing services. 
For example, if a user needs to complete road vehicle monitoring, it can be transformed into a video stream processing pipeline in the form of _[vehicle detection, license plate location, license plate recognition]_. In this pipeline, services such as _vehicle detection_ constitute a stage of the pipeline.
Each stage can be represented by an independent AI processing logic, thus allowing it to be encapsulated into the processor of the collaborative scheduling layer. The application service layer provides users with all the service types supported by the current system and formulates corresponding specifications for the services.
Users can arbitrarily arrange different services under the premise of compliance with the specifications, thereby combining the application processing logic required by the user.

It should be noted that the content of services supported by the system and the user's arrangement of applications are completed in the interaction between the user and the frontend page.