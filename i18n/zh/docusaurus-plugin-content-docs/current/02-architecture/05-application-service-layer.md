---
sidebar_label: 应用服务层
slug: /architecture/application-service-layer
custom_edit_url: null
---

# 应用服务层

应用服务层为用户的需求定制具体的应用处理逻辑，从而向大禹调度系统提供上层的逻辑化应用表示。

具体来说，用户的需求可以转化为由一个阶段或多个阶段AI处理服务组成的应用流水线，
例如用户需要完成路面车辆监控，可以转化为“车辆检测、车牌定位、车牌识别”形式的视频流处理流水线，在这个流水线中“车辆检测”这样的服务构成了流水线的一个阶段，
且每个阶段可以使用一种独立的AI处理逻辑表示，从而可以封装进协同调度层的处理器中。应用服务层中为用户提供当前系统支持的所有服务类型，并对服务制定对应的规约，
用户可以在符合规约的前提下任意编排不同的服务，从而组合成用户需要的应用处理逻辑。

需要注意的是，系统中支持的服务内容和用户对应用的编排均在用户与前端页面的交互中完成。

