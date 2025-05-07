---
sidebar_label: Quick Start
slug: /getting-start/quick-start
custom_edit_url: null
---

# Quick Start

- Install KubeEdge system on your devices ([instruction](https://box.nju.edu.cn/f/63e12c4ea0794718b16c/)). Our dayu system is based on KubeEdge.

- Modify template files in template directory '[template](template)'

- Deploy files on devices as setting in templates. The demo deploy files are placed [here](https://box.nju.edu.cn/d/0dcaabb5362c4dfc8008/)

- Install/Uninstall Dayu system.

```bash
# install dayu system
ACTION=start TEMPLATE=template/ bash - dayu.sh
# uninstall dayu system
ACTION=stop TEMPLATE=template/ bash - dayu.sh 
```