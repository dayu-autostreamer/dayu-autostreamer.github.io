---
sidebar_label: Install KubeEdge
slug: /getting-started/install-lower-layer-system/install-kubeedge
custom_edit_url: null
---

# Install KubeEdge

## Download keadm (both cloud/edge)

keadm is mainly used for kubeedge management, installation, and usage.

Official release version link: [Release KubeEdge v1.9.2 release · kubeedge/kubeedge (github.com)](https://github.com/kubeedge/kubeedge/releases/)

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

This step may occur [Question 4：10002 already in use](/docs/getting-started/install-lower-layer-system/faqs#question-410002-already-in-use)

### Reset environment (Skip on first installation)

```bash
keadm reset
```

### Start cloudcore

Start cloudcore by keadm
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

This step may occur [Question 5：edgecore file exists](/docs/getting-started/install-lower-layer-system/faqs#question-5edgecore-file-exists)

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

This step may occur [Question 25：keadm join error on edge nodes](/docs/getting-started/install-lower-layer-system/faqs#question-25keadm-join-error-on-edge-nodes).

```bash
# Check for logs
journalctl -u edgecore.service -f
```


