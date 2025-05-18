---
sidebar_label: 安装 NVIDIA GPU 支持
slug: /getting-started/install-lower-layer-system/install-nvidia-gpu-support
custom_edit_url: null
---

# 安装NVIDIA GPU支持

## 开启 GPU 支持 （云边共用）

在云端运行下面命令：
```bash
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.13.0/nvidia-device-plugin.yml
```

在边端修改`edgecore.yaml`
```bash
vim /etc/kubeedge/config/edgecore.yaml
# 修改以下部分
devicePluginEnabled: true

# 重启edgecore
systemctl restart edgecore.service
```

修改云边所有设备上的`/etc/dockerdaemon.json`，添加如下内容：
```json
{
    "default-runtime": "nvidia",
    "runtimes": {
        "nvidia": {
            "path": "nvidia-container-runtime",
            "runtimeArgs": []
        }
    },
}
```

## 正常运行状态

在云端使用 `kubectl get pods -A` 查看nvidia相关pod，并使用 `kubectl logs xxx -n xxx` 或 `kubectl describe pod xxx -n xxx` 检查pod的情况。

云端pod情况：

![nvidia-plugin1.png](/img/install/nvidia-plugin1.png)

[//]: # (<img src="/img/install/nvidia-plugin1.png" alt="nvidia-plugin1.png" style="zoom:67%;" />)

![nvidia-plugin2.png](/img/install/nvidia-plugin2.png)

边端pod情况：

![nvidia-plugin3.png](/img/install/nvidia-plugin3.png)

![nvidia-plugin4.png](/img/install/nvidia-plugin4.png)


在云端运行demo容器检查nvidia gpu是否能够正常获取：
```bash
kubectl run -i -t nvidia --image=jitteam/devicequery
```

![nvidia-plugin5.png](/img/install/nvidia-plugin5.png)
