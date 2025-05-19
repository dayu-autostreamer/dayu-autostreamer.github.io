---
sidebar_label: Install EdgeMesh
slug: /getting-started/install-lower-layer-system/install-edgemesh
custom_edit_url: null
---

# Install EdgeMesh

## EdgeMesh environment preparation (cloud)

This Step may occur [Question 6：TLSStreamPrivateKeyFile not exist](/docs/getting-started/install-lower-layer-system/faqs#question-6tlsstreamprivatekeyfile-not-exist)

Step 1: Remove the taint on the master node.
```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

Step 2: Add filter tags to Kubernetes API services.
```bash
kubectl label services kubernetes service.edgemesh.kubeedge.io/service-proxy-name=""
```

Step 3: Enable Kube-API endpoint service of KubeEdge on edges.
  
On the cloud, enable `dynamicController`:
```bash
vim /etc/kubeedge/config/cloudcore.yaml
# Modify cloudcore.yaml
modules:
  ..
  cloudStream:
    enable: true
    streamPort: 10003
  ..
  dynamicController:
    enable: true
    
# Restart cloucore
systemctl restart cloudcore.service
```

On the edges, enable `metaServer` and `edgeStream` (note that this operation should redo after `keadm reset`).
```bash
vim /etc/kubeedge/config/edgecore.yaml
# Modify edgecore.yaml
edgeStream:  
	enable: true  
	handshakeTimeout: 30  
	readDeadline: 15  
	server: 192.168.0.139:10004  
	tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt  
	tlsTunnelCertFile: /etc/kubeedge/certs/server.crt  
	tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key  
	writeDeadline: 15
...
metaManager:
    metaServer:
      enable: true
...

# Restart edgecore
systemctl restart edgecore.service
# Check running state
journalctl -u edgecore.service -f
```

Step 4: On the edge, test whether the edge Kube-API endpoint functions normally.
```bash
# Execute on edges
curl 127.0.0.1:10550/api/v1/services
```

![api](/img/install/api.png)

If the return value is an empty list, or it takes a long time (close to 10 seconds) to receive the return value, it indicates that there may be an error in the configuration, please check it carefully.

## Start EdgeMesh (both cloud/edge)

> This is a hot spot for problems, when encountering issues, please refer to the EdgeMesh official manual for troubleshooting:
> 
> [快速上手 | EdgeMesh](https://edgemesh.netlify.app/zh/guide/#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85)
> 
> [全网最全EdgeMesh Q&A手册 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/585749690)

### Deploy edgemesh-agent (cloud)

Download edgemesh code:
```bash
# clone edgemesh code (customized by dayu)
git clone https://github.com/dayu-autostreamer/dayu-edgemesh.git
# move in code directory
cd dayu-edgemesh
```

Add `relay node`:
```bash
vim build/agent/resources/04-configmap.yaml
# Add the master node (cloud) as relay node for cloud-edge communication：
....
edgeTunnel:
        enable: true
        relayNodes:
        - nodeName: <hostname>
          advertiseAddress:
          - <ip>
....
# Fulfill <hostname> <ip> with hostname and ip of the cloud.
```

Deploy edgemesh:
```bash
# Deploy crd files
kubectl apply -f build/crds/istio/
# Deploy edgemesh-agent
kubectl apply -f build/agent/resources/
```

NOTE: If using the [Intranet Image Repository](/docs/developer-guide/how-to-build/docker-registry/), please modify the image in the yaml file, such as:
```
dayuhub/edgemesh-gateway:v1.0 -> repo:5000/dayuhub/edgemesh-gateway:v1.0
```

### Configure edge network (edge)

Configure the edge:
```bash
vim /etc/kubeedge/config/edgecore.yaml
# Modify edgecore.yaml
edged:
    clusterDNS: 169.254.96.16
    clusterDomain: cluster.local
```

![edgecore](/img/install/edgecore1.png)

![edgecore](/img/install/edgecore2.png)

Restart edgecore:
```bash
systemctl restart edgecore
```

### Check running state

Check iptables state:
```bash
iptables -t nat -nvL
```
![iptables](/img/install/iptables.png)

Check the state of edgemesh pods:
```bash
kubectl get pods -n kubeedge
```
![normal-run](/img/install/EdgeMeshNormalRun.jpg)

Logs on the cloud：
```bash
kubectl logs -n kubeedge [pod-name]
```
![cloud-agent](/img/install/cloud-agent.png)

Logs on the edge：
```bash
# Check edgemesh logs on the edge
kubectl logs -n kubeedge [pod-name]
```

![edge-agent.png](/img/install/edge-agent.png)


### Uninstall Edgemesh

If you need to reinstall Edgemesh, please uninstall it first.
```bash
cd dayu-edgemesh
kubectl delete -f build/crds/istio/
kubectl delete -f build/agent/resources/
```

