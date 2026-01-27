---
sidebar_label: 安装Sedna
slug: /getting-started/install-lower-layer-system/install-sedna
---

# 安装Sedna

## 下载Sedna（云端）
```bash
# clone sedna代码（大禹定制版）
git clone https://github.com/dayu-autostreamer/dayu-sedna.git
# 进入dayu-sedna文件目录
cd dayu-sedna
```

## 安装Sedna （云端）

可能遇到 [问题十：lc12700-5353-no-such-hostconnection-refused](/docs/getting-started/install-lower-layer-system/faqs#问题十lc12700-5353-no-such-hostconnection-refused)

```bash
# 设置镜像源，不设置默认为dockerhub(docker.io)
export REG=xxx
# 安装
SEDNA_ACTION=create bash - install.sh
# 卸载
SEDNA_ACTION=delete bash - install.sh
```

安装完后通过`kubectl logs xxx -n sedna`检查log，需着重查看 lc 是否连接 gm 成功。

## 检查Sedna运行状态

![lc](/img/install/sedna_lc.png)

![gm](/img/install/sedna_gm.png)

