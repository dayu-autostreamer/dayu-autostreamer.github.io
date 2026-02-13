---
sidebar_label: 常用指令
sidebar_position: 8
slug: /getting-started/install-lower-layer-system/common-commands
---

# 常用指令

```bash
# 进入root用户
su
# 退出root用户
exit
# kubernetes根据yaml文件创建资源
kubectl apply -f <yaml文件路径>
# 拉取/推送镜像（[镜像网站]可选，默认根据配置中的registry-mirrors选取）
docker pull [<dockerhub镜像网站>/]<仓库名>/<镜像名>:<tag名>
docker push [<dockerhub镜像网站>/]<仓库名>/<镜像名>:<tag名>
# 重置kubernetes状态，主要用于失败后尝试重新部署
kubeadm reset
# 获取token
kubeadm gettoken
# 查看kubernetes状态，一般需要所有容器都是Running状态，[-owide]可选（用于显示更多信息）
kubectl get pods -A [-owide]
# 在修改/etc/daemon.json后重新加载docker daemon
systemctl daemon-reload
systemctl restart docker
# 重启cloudcore、edgecore服务
systemctl restart cloudcore.service
systemctl restart edgecore.service
```