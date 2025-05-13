---
sidebar_label: Docker镜像源配置
slug: /developer-guide/how-to-build/docker-registry
custom_edit_url: null
unlisted: true
---

# Docker镜像源配置

由于[docker镜像仓库](https://hub.docker.com/repositories/)的连接问题，可以使用registry mirror和内网私有仓库两种方式处理这个问题。


##  使用registry mirror
使用第三方镜像源，将域名加到/etc/docker/daemon.json中（[部分可用镜像源参考](https://www.wangdu.site/course/2109.html)）

(缺点：速度较慢 适用场景：拉取外部镜像)

修改daemon.json
```bash
sudo tee /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": ["https://xxx","https://xxx"]
}
EOF
```

重启 docker
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 配置私有仓库

在在内网中部署配置自己的私有镜像仓库

(缺点：缺少外部镜像 适用场景：存储系统本身需要的镜像，或转存外部镜像)

### 搭建私有仓库（已有私有仓库可跳过）

选择一个内网可连接的linux主机（以114.212.87.136为例） 

运行registry构建docker仓库
```bash
# 创建镜像存放目录
mkdir -p /data/registry
# 拉取 docker registry 镜像
docker pull registry
# 运行 registry 镜像
docker run -d --name registry -v /data/registry:/var/lib/registry -p 5000:5000 --restart=always -e REGISTRY_STORAGE_DELETE_ENABLED=true registry 
```

检查运行情况
```bash
~$ sudo docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                                       NAMES
050306825f5f   6a3edb1d5eb6   "/entrypoint.sh /etc…"   37 minutes ago   Up 32 minutes   0.0.0.0:5000->5000/tcp, :::5000->5000/tcp   frosty_raman
```

修改配置文件
```bash
# 从容器中移除配置文件
docker cp registry:/etc/docker/registry/config.yml ./config.yml
# 将修改后的配置文件加载到容器中
docker cp ./config.yml registry:/etc/docker/registry/config.yml 
# 重启容器
docker restart registry
```

创建私有仓库ui
```bash
docker run -d \
  --name registry-ui \
  -p 8080:80 \
  -e REGISTRY_TITLE="xxx" \  #填入想在前端显示的名字
  -e REGISTRY_URL="http://114.212.87.136:5000" \  # 填入ip
  -e SINGLE_REGISTRY=true \
  -e DELETE_IMAGES=true \
  -e SHOW_CATALOG_NB_TAGS=true \
  --link registry \
  --restart=always \
  joxit/docker-registry-ui:latest
 
# 访问 http://114.212.87.136:8080 查看页面
```

定期回收垃圾（删除镜像索引之后实际文件依旧存在）
```bash
docker exec -it registry registry garbage-collect  /etc/docker/registry/config.yml | grep "blob eligible for deletion:"
```

### 客户端设置及使用私有仓库

在需要使用私有仓库的设备上设置
```bash
# 设置 hostname (简化使用)
sudo vim /etc/hosts
# 添加
114.212.87.136 repo

# 配置docker daemon
sudo vim /etc/docker/daemon.json
# 添加
{
    "insecure-registries": ["repo:5000", "114.212.87.136:5000"]
}

# 重启docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

使用私有仓库
```bash
# 打 tag
docker tag dayuhub/backend:v1.0 repo:5000/dayuhub/backend:v1.0
# 或：docker tag dayuhub/backend:v1.0 114.212.87.136:5000/dayuhub/backend:v1.0

# 推送镜像
docker push repo:5000/dayuhub/backend:v1.0
# 或：docker push 114.212.87.136:5000/dayuhub/backend:v1.0

# 拉取镜像
docker pull repo:5000/dayuhub/backend:v1.0
# 或：docker pull 114.212.87.136:5000/dayuhub/backend:v1.0
```

编译构建大禹系统镜像时，请配置`REG`环境参数和`buildkitd.toml`文件来使用私有仓库，具体请查阅[构建镜像](/docs/developer-guide/how-to-build/build-components#quick-building)




