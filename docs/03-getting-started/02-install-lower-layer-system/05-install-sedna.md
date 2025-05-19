---
sidebar_label: Install Sedna
slug: /getting-started/install-lower-layer-system/install-sedna
custom_edit_url: null
---

# Install Sedna

## Download Sedna (cloud)
```bash
# clone sedna code (customized by dayu)
git clone https://github.com/dayu-autostreamer/dayu-sedna.git
# move to code directory
cd dayu-sedna
```

## Install Sedna (cloud)

This step may occur [Question 10: lc127.0.0. 53:53 no such host/connection refused](/docs/getting-started/install-lower-layer-system/faqs#question-10-lc12700-5353-no-such-hostconnection-refused).

```bash
# Set image source. The default source is dockerhub (docker.io).
export REG=xxx
# Install
SEDNA_ACTION=create bash - install.sh
# Uninstall
SEDNA_ACTION=delete bash - install.sh
```

After installation, check the logs with `kubectl logs xxx -n sedna`, and pay special attention to whether lc has successfully connected to gm.

## Check running state of Sedna

![lc](/img/install/sedna_lc.png)

![gm](/img/install/sedna_gm.png)


