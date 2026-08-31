---
sidebar_label: Install Sedna
sidebar_position: 6
slug: /getting-started/install-lower-layer-system/install-sedna
---

# Install Sedna

## Download Sedna (cloud)
```bash
# Clone the Sedna release used by Dayu.
git clone --branch v1.1 --depth 1 https://github.com/dayu-autostreamer/dayu-sedna.git
# move to code directory
cd dayu-sedna
```

Dayu requires `dayu-sedna v1.1`. Keep it paired with `dayu-edgemesh v1.1`.

## Install Sedna (cloud)

This step may encounter [Question 10: Sedna LC cannot resolve `gm.sedna`](/docs/getting-started/install-lower-layer-system/faqs#question-10-sedna-lc-dns).

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
