---
sidebar_label: Install KubeEdge
slug: /getting-started/install-lower-layer-system/install-kubeedge
custom_edit_url: null
---

# Install KubeEdge

## Download keadm (both cloud/edge)

keadm is mainly used for kubeedge management, installation, and usage.

Official release version link: [Release KubeEdge v1.9.2 release · kubeedge/kubeedge (github.com)](https://github.com/kubeedge/kubeedge/releases/).

```bash
# Check machine architecture
uname -a
# Download keadm with corresponding version and architecture
wget https://github.com/kubeedge/kubeedge/releases/download/v1.9.2/keadm-v1.9.2-linux-amd64.tar.gz
# Unzip
tar zxvf keadm-v1.9.2-linux-amd64.tar.gz
# Add execution permissions
chmod +x keadm-v1.9.2-linux-amd64/keadm/keadm 
# Move to /usr/local/bin/
cp keadm-v1.9.2-linux-amd64/keadm/keadm /usr/local/bin/
```

## Start KubeEdge (cloud)

This step may occur [Question 4：10002 already in use](/docs/getting-started/install-lower-layer-system/faqs#question-4-10002-already-in-use).

### Reset environment (Skip on first installation)

```bash
keadm reset
```

### Start cloudcore

Start cloudcore by keadm.
```bash
# Modify the ip address of '--adverse-address'
keadm init --advertise-address=114.212.81.11 --kubeedge-version=1.9.2

# Open forwarding route
kubectl get cm tunnelport -n kubeedge -o yaml
# find '10350' or '10351' in the result

# set CLOUDCOREIPS
export CLOUDCOREIPS=xxx.xxx.xxx.xxx
# set 'dport' as previously 'tunnelport'
iptables -t nat -A OUTPUT -p tcp --dport 10351 -j DNAT --to $CLOUDCOREIPS:10003

cd /etc/kubeedge/

# or download manually from https://github.com/kubeedge/kubeedge/blob/master/build/tools/certgen.sh
wget https://raw.githubusercontent.com/kubeedge/kubeedge/refs/heads/master/build/tools/certgen.sh

bash certgen.sh stream
```

### Configure cloudcore

```bash
vim /etc/kubeedge/config/cloudcore.yaml

# modify cloudcore.yaml 
modules:
  ..
  cloudStream:
    enable: true
    streamPort: 10003
  ..
  dynamicController:
    enable: true
```

Restart cloudcore：
```bash
sudo systemctl restart cloudcore.service
```

If restarting cloudcore fails, the solution is as follows:
```bash
# Place the generated 'cloudcore.service' under the folder managed by systemctl
cp /etc/kubeedge/cloudcore.service /etc/systemd/system
```

Use `journalctl -u cloudcore.service -xe` to check if cloudcore is running normally and there are no errors reported.

## Join KubeEdge cluster (edge)

This step may occur [Question 5：edgecore file exists](/docs/getting-started/install-lower-layer-system/faqs#question-5-edgecore-file-exists).

If `keadm join` fails, you can retry from `keadm reset`.

### Reset environment (Skip on first installation)
```bash
# reset
keadm reset

# When rejoining, if an error was reported that there was a folder, just deleted directly.
rm -rf /etc/kubeedge

# Possible docker container occupancy (usually 'mqtt')
docker ps -a
docker stop mqtt
docker rm mqtt
```

### Start edgecore

To start edgecore, you need to get token on the master node (cloud) first:
```bash
keadm gettoken
```

Execute on the edge:
```bash
# Add IP address of the master here. The token here is obtained from the master
keadm join --cloudcore-ipport=114.212.81.11:10000 --kubeedge-version=1.9.2 --token=9e1832528ae701aba2c4f7dfb49183ab2487e874c8090e68c19c95880cd93b50.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk1NjU4MzF9.1B4su4QwvQy_ZCPs-PIyDT9ixsDozfN1oG4vX59tKDs
```

This step may occur [Question 25：keadm join error on edge nodes](/docs/getting-started/install-lower-layer-system/faqs#question-25-keadm-join-error-on-edge-nodes).

```bash
# Check for logs
journalctl -u edgecore.service -f
```

## Set Jetpack label (Optional for Jetson devices)

If the edge device is a Jetson device, you need to set the label for Jetpack version.

### Check apiserver address (edge)
Use `curl` on edge devices to check apiserver address:
```bash
# replace MASTER_IP with the actual master (cloud) IP address
curl -k --max-time 3 https://MASTER_IP:6443/healthz
```

If the response is `ok`, the apiserver address is correct. If not, please check the network connection between the edge device and the cloud or the apiserver address.

### Create SA + RBAC (cloud)
Create a service account and cluster role binding for setting labels.
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

### Generate kubeconfig (cloud)

Get token on the cloud:
```bash
SECRET=$(kubectl -n kube-system get sa jetpack-node-labeler -o jsonpath='{.secrets[0].name}')
TOKEN=$(kubectl -n kube-system get secret "$SECRET" -o jsonpath='{.data.token}' | base64 -d)
```

Get CA cert on the cloud:
```bash
CA_CRT=$(kubectl config view --raw -o jsonpath='{.clusters[0].cluster.certificate-authority-data}')
```

Generate kubeconfig file on the cloud:
```bash
# Replace MASTER_IP with actual master (cloud) IP address
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

### Create secret (cloud)

Create a secret in the `kube-system` namespace to store the kubeconfig file:
```bash
kubectl -n kube-system create secret generic jetpack-labeler-kubeconfig \
  --from-file=config=jetpack-labeler.kubeconfig \
  --dry-run=client -o yaml | kubectl apply -f -
```

### Deploy daemonset (cloud)

Deploy the daemonset to set Jetpack labels:
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

Verify that the labels have been set correctly:
```bash
kubectl -n kube-system get pod -l app=jetpack-node-labeler -o wide
kubectl -n kube-system logs -l app=jetpack-node-labeler --tail=100
kubectl get nodes -L jetson.nvidia.com/jetpack.major,jetson.nvidia.com/l4t.major
```