---
sidebar_label: 安装KubeEdge
slug: /getting-started/install-lower-layer-system/install-kubeedge
---

# 安装KubeEdge

## 下载 keadm（云边共用）

keadm主要用于 kubeedge 管理、安装和使用

官方发行版本链接：[Release KubeEdge v1.9.2 release · kubeedge/kubeedge (github.com)](https://github.com/kubeedge/kubeedge/releases/)

```bash
#查看自己的架构
uname -a
#下载对应版本以及架构
wget https://github.com/kubeedge/kubeedge/releases/download/v1.9.2/keadm-v1.9.2-linux-amd64.tar.gz
#解压
tar zxvf keadm-v1.9.2-linux-amd64.tar.gz
#添加执行权限
chmod +x keadm-v1.9.2-linux-amd64/keadm/keadm 
#移动目录
cp keadm-v1.9.2-linux-amd64/keadm/keadm /usr/local/bin/
```

## 启动 KubeEdge（云端）

可能出现 [问题四：10002 already in use](/docs/getting-started/install-lower-layer-system/faqs#问题四10002-already-in-use)

### 重置环境（第一次安装时跳过）

```bash
keadm reset
```

### 启动 cloudcore

通过 keadm 启动
```bash
# 注意修改--advertise-address的ip地址
keadm init --advertise-address=114.212.81.11 --kubeedge-version=1.9.2

# 打开转发路由
kubectl get cm tunnelport -n kubeedge -o yaml
# 找到10350 或者 10351

# 设置CLOUDCOREIPS
export CLOUDCOREIPS=xxx.xxx.xxx.xxx
# 设置dport（内容对应之前获取的tunnelport）
iptables -t nat -A OUTPUT -p tcp --dport 10351 -j DNAT --to $CLOUDCOREIPS:10003

cd /etc/kubeedge/

# 或者从网站下载 https://github.com/kubeedge/kubeedge/blob/master/build/tools/certgen.sh
wget https://raw.githubusercontent.com/kubeedge/kubeedge/refs/heads/master/build/tools/certgen.sh

bash certgen.sh stream
```

### cloudcore 配置

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
```

重启 cloudcore：
```bash
sudo systemctl restart cloudcore.service
```

如果直接重启cloudcore失败，解决方法如下：
```bash
# 将生成的cloudcore.service放到systemctl管理的文件夹下
cp /etc/kubeedge/cloudcore.service /etc/systemd/system
```

使用 `journalctl -u cloudcore.service -xe` 查看cloudcore是否正常运行且没有报错

## 加入KubeEdge集群（边端）

可能出现 [问题五：edgecore-符号链接已存在](/docs/getting-started/install-lower-layer-system/faqs#问题五edgecore-符号链接已存在)

如果 `keadm join` 失败可以从 `keadm reset` 开始重新尝试

### 重置环境（第一次安装时跳过）
```bash
# 重启
keadm reset

# 重新加入时，报错存在文件夹，直接删除
rm -rf /etc/kubeedge

# docker容器占用(通常是mqtt)
docker ps -a
docker stop mqtt
docker rm mqtt
```

### 启动 edgecore

启动edgecore时，需要在云端获取token:
```bash
keadm gettoken
```

在边端执行:
```bash
# 注意这里是要加入master的IP地址，token是master上获取的
keadm join --cloudcore-ipport=114.212.81.11:10000 --kubeedge-version=1.9.2 --token=9e1832528ae701aba2c4f7dfb49183ab2487e874c8090e68c19c95880cd93b50.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk1NjU4MzF9.1B4su4QwvQy_ZCPs-PIyDT9ixsDozfN1oG4vX59tKDs
```

可能出现 [问题二十五：边端join报错](/docs/getting-started/install-lower-layer-system/faqs#问题二十五边端join报错)

```bash
# 加入后，先查看信息
journalctl -u edgecore.service -f
```

## 设置Jetpack标签 (Jetson设备可选)

如果边缘设备是Jetson设备，您需要设置Jetpack版本的标签。

### 检查 apiserver 地址（边端）
使用 `curl` 在边缘设备上检查 api 服务器地址：
```bash
# 将MASTER_IP替换为实际的 master节点（云服务器）IP地址
curl -k --max-time 3 https://MASTER_IP:6443/healthz
```

如果响应是 `ok`，则apiserver地址正确；如果不是，请检查边缘设备和云之间或apiserver地址的网络连接。

### 创建 SA + RBAC（云端）
创建一个服务帐户和集群角色绑定以设置标签：
```bash
kubectl -n kube-system create sa jetpack-node-labeler

kubectl apply -f - <<'YAML'
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: jetpack-node-labeler
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get","patch","update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: jetpack-node-labeler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: jetpack-node-labeler
subjects:
- kind: ServiceAccount
  name: jetpack-node-labeler
  namespace: kube-system
YAML
```

### 生成 kubeconfig（云端）

在云端获取 token：
```bash
SECRET=$(kubectl -n kube-system get sa jetpack-node-labeler -o jsonpath='{.secrets[0].name}')
TOKEN=$(kubectl -n kube-system get secret "$SECRET" -o jsonpath='{.data.token}' | base64 -d)
```

获取CA证书：
```bash
CA_CRT=$(kubectl config view --raw -o jsonpath='{.clusters[0].cluster.certificate-authority-data}')
```

在云服务器上生成kubeconfig文件：
```bash
# 将MASTER_IP替换为实际的 master节点（云服务器）IP地址
MASTER="https://MASTER_IP:6443"

cat > jetpack-labeler.kubeconfig <<EOF
apiVersion: v1
kind: Config
clusters:
- name: edge-cluster
  cluster:
    server: ${MASTER}
    certificate-authority-data: ${CA_CRT}
users:
- name: jetpack-node-labeler
  user:
    token: ${TOKEN}
contexts:
- name: jetpack
  context:
    cluster: edge-cluster
    user: jetpack-node-labeler
current-context: jetpack
EOF
```

### 创建 secret（云端）

在 `kube-system` 命名空间中创建一个 secret 以存储 kubeconfig 文件：
```bash
kubectl -n kube-system create secret generic jetpack-labeler-kubeconfig \
  --from-file=config=jetpack-labeler.kubeconfig \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 部署 daemonset（云端）

部署 daemonset 以设置 Jetpack 标签：
```bash
kubectl apply -f - <<'YAML'
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: jetpack-node-labeler
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: jetpack-node-labeler
  template:
    metadata:
      labels:
        app: jetpack-node-labeler
    spec:
      serviceAccountName: jetpack-node-labeler
      nodeSelector:
        kubernetes.io/arch: arm64
      tolerations:
      - operator: Exists
      volumes:
      - name: host-etc
        hostPath:
          path: /etc
          type: Directory
      - name: kubeconfig
        secret:
          secretName: jetpack-labeler-kubeconfig
      - name: tmp
        emptyDir: {}
      containers:
      - name: labeler
        image: bitnami/kubectl:latest
        env:
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: KUBECONFIG
          value: /kube/config
        - name: HOME
          value: /tmp
        volumeMounts:
        - name: host-etc
          mountPath: /host/etc
          readOnly: true
        - name: kubeconfig
          mountPath: /kube
          readOnly: true
        - name: tmp
          mountPath: /tmp
        command: ["/bin/sh","-c"]
        args:
        - |
          set -eu

          if [ ! -f /host/etc/nv_tegra_release ]; then
            echo "Not a Jetson (no /etc/nv_tegra_release). Skip."
            sleep 360000
          fi

          LINE="$(head -n 1 /host/etc/nv_tegra_release || true)"
          L4T_MAJOR="$(echo "$LINE" | sed -n 's/.*R\([0-9]\+\).*/\1/p' | head -n1)"

          JP="unknown"
          case "$L4T_MAJOR" in
            32) JP="4" ;;
            35) JP="5" ;;
            36) JP="6" ;;
          esac

          echo "node=$NODE_NAME L4T_MAJOR=$L4T_MAJOR -> JP=$JP"

          kubectl label node "$NODE_NAME" \
            jetson.nvidia.com/jetpack.major="$JP" \
            jetson.nvidia.com/l4t.major="${L4T_MAJOR:-unknown}" \
            --overwrite

          echo "label ok"
          sleep 360000
YAML
```

验证标签是否已正确设置：
```bash
kubectl -n kube-system get pod -l app=jetpack-node-labeler -o wide
kubectl -n kube-system logs -l app=jetpack-node-labeler --tail=100
kubectl get nodes -L jetson.nvidia.com/jetpack.major,jetson.nvidia.com/l4t.major
```
