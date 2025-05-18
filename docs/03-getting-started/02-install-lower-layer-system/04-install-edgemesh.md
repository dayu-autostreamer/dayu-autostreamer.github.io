---
sidebar_label: Install EdgeMesh
slug: /getting-started/install-lower-layer-system/install-edgemesh
custom_edit_url: null
---

# Install EdgeMesh

[TBD]

## EdgeMesh 环境准备（云端）


可能出现 [问题六：缺少 TLSStreamCertFile](/docs/getting-started/install-lower-layer-system/faqs#问题六缺少-tlsstreamcertfile)

步骤 1: 去除 K8s master 节点的污点
```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

步骤 2: 给 Kubernetes API 服务添加过滤标签
```bash
kubectl label services kubernetes service.edgemesh.kubeedge.io/service-proxy-name=""
```

步骤 3: 启用 KubeEdge 的边缘 Kube-API 端点服务
  
在云端，开启 dynamicController 模块：
```bash
vim /etc/kubeedge/config/cloudcore.yaml
# 修改 cloudcore.yaml 内容
modules:
  ..
  cloudStream:
    enable: true
    streamPort: 10003
  ..
  dynamicController:
    enable: true
    
# 重启cloucore
systemctl restart cloudcore.service
```

在边端，打开 metaServer 模块和 edgeStream (注意，keadm reset后需要重新修改)
```bash
vim /etc/kubeedge/config/edgecore.yaml
# 修改 edgecore.yaml 内容
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

#重启edgecore
systemctl restart edgecore.service
#检查状况
journalctl -u edgecore.service -f
#确定正常运行
```

步骤 4: 在边缘节点，测试边缘 Kube-API 端点功能是否正常

```bash
# 边缘节点上
curl 127.0.0.1:10550/api/v1/services
```

![api](/img/install/api.png)

如果返回值是空列表，或者响应时长很久（接近 10 s）才拿到返回值，说明配置可能有误，请仔细检查。

## 启动 EdgeMesh（云边共用）

> 此处问题重灾区，遇到问题可参照EdgeMesh官方手册排查：
> 
> [快速上手 | EdgeMesh](https://edgemesh.netlify.app/zh/guide/#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85)
> 
> [全网最全EdgeMesh Q&A手册 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/585749690)

### 部署edgemesh-agent（云端）

下载 edgemesh代码
```bash
# clone edgemesh代码
git clone https://github.com/dayu-autostreamer/dayu-edgemesh.git
# 进入代码文件夹
cd dayu-edgemesh
```

添加relay node
```bash
vim build/agent/resources/04-configmap.yaml

# 添加云服务器为relay node, 以便云边通信，如：
....
edgeTunnel:
        enable: true
        relayNodes:
        - nodeName: <hostname>
          advertiseAddress:
          - <ip>
....

# （<hostname> <ip> 分别需要填入云服务器的hostname与ip
```

部署edgemesh
```bash
# crd 文件部署
kubectl apply -f build/crds/istio/
# 在集群中部署 edgemesh-agent
kubectl apply -f build/agent/resources/
```


提示: 如果使用[内网镜像仓库](/docs/developer-guide/how-to-build/docker-registry/)，请进入yaml文件中修改image源，如:
```
dayuhub/edgemesh-gateway:v1.0 -> repo:5000/dayuhub/edgemesh-gateway:v1.0
```

### 配置edge端网络（边端）
配置 edge
```bash
vim /etc/kubeedge/config/edgecore.yaml
# 修改 edgecore.yaml 内容
edged:
    clusterDNS: 169.254.96.16
    clusterDomain: cluster.local
```

![edgecore](/img/install/edgecore1.png)

![edgecore](/img/install/edgecore2.png)

重启edgecore：
```bash
systemctl restart edgecore
```

### 正常运行状态

查看iptables状态：
```bash
iptables -t nat -nvL
```
![iptables](/img/install/iptables.png)

查看edgemesh pods状态：
```bash
kubectl get pods -n kubeedge
```
![normal-run](/img/install/EdgeMeshNormalRun.jpg)

云端logs：
```bash
kubectl logs -n kubeedge [pod-name]
```
![cloud-agent](/img/install/cloud-agent.png)

边端logs：
```bash
# 查看边端edgemesh
kubectl logs -n kubeedge [pod-name]
```

![edge-agent.png](/img/install/edge-agent.png)


### 卸载Edgemesh

如需重装Edgemesh，请先卸载
```bash
cd dayu-edgemesh
kubectl delete -f build/crds/istio/
kubectl delete -f build/agent/resources/
```

