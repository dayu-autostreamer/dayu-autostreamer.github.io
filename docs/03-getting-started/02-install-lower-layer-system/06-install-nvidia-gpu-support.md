---
sidebar_label: Install NVIDIA GPU Support
slug: /getting-started/install-lower-layer-system/install-nvidia-gpu-support
---

# Install NVIDIA GPU Support

## Enable GPU support (both cloud/edge)

Execute on the cloud:
```bash
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.13.0/nvidia-device-plugin.yml
```

Modify `edgecore.yaml` on the edge:
```bash
vim /etc/kubeedge/config/edgecore.yaml
# Modify the follwoing part:
devicePluginEnabled: true

# Restart edgecore
systemctl restart edgecore.service
```

Modify `/etc/docker/daemon.json` on all cloud/edge devices, and add the following content:
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

## Check running state

On the cloud, use `kubectl get pods -A` to find all the nvidia related pods. Then, use `kubectl logs xxx -n xxx` or `kubectl describe pod xxx -n xxx` to check pod state.

Pod state on the cloud:

![nvidia-plugin1.png](/img/install/nvidia-plugin1.png)

[//]: # (<img src="/img/install/nvidia-plugin1.png" alt="nvidia-plugin1.png" style="zoom:67%;" />)

![nvidia-plugin2.png](/img/install/nvidia-plugin2.png)

Pod state on the edge:

![nvidia-plugin3.png](/img/install/nvidia-plugin3.png)

![nvidia-plugin4.png](/img/install/nvidia-plugin4.png)


Run the demo container on the cloud to check whether nvidia gpu can be obtained normally:
```bash
kubectl run -i -t nvidia --image=jitteam/devicequery
```

![nvidia-plugin5.png](/img/install/nvidia-plugin5.png)

