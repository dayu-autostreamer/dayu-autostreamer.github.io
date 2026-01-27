---
sidebar_label: Common Commands
slug: /getting-started/install-lower-layer-system/common-commands
---

# Common Commands

```bash
# enter root
su
# exit root
exit
# kubernetes create resources based on a yaml file
kubectl apply -f <yaml path>
# pull/push docker images
docker pull [<registry>/]<repository>/<image>:<tag>
docker push [<registry>/]<repository>/<image>:<tag>
# reset kubernetes for re-deployment after failure
kubeadm reset
# get token of kubernetes master
kubeadm gettoken
# check kubernetes states, running as normal (use [-owide] to see more information)
kubectl get pods -A [-owide]
# reload docker daemon after change /etc/daemon.json
systemctl daemon-reload
systemctl restart docker
# restart services like cloudcore/edgecore
systemctl restart cloudcore.service
systemctl restart edgecore.service
```
