---
sidebar_label: 安装Sedna
sidebar_position: 6
slug: /getting-started/install-lower-layer-system/install-sedna
---

# 安装Sedna

## 下载Sedna（云端）
```bash
# 克隆大禹系统配套的 Sedna 版本
git clone --branch v1.1 --depth 1 https://github.com/dayu-autostreamer/dayu-sedna.git
# 进入dayu-sedna文件目录
cd dayu-sedna
```

大禹系统要求使用 `dayu-sedna v1.1`，并与 `dayu-edgemesh v1.1` 配套。

## 安装Sedna （云端）

可能遇到[问题十：Sedna LC 无法解析 `gm.sedna`](/docs/v1.4/getting-started/install-lower-layer-system/faqs#question-10-sedna-lc-dns)。

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
