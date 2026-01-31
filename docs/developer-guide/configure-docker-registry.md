---
sidebar_label: Configure Docker Registry
slug: /developer-guide/configure-docker-registry
unlisted: true
---

# Configure Docker Registry

To solve connection issues with the [Docker image repository](https://hub.docker.com/repositories/), two ways can be chosen: using a registry mirror and setting up an internal private repository.

##  Use registry mirror
Use a third-party registry mirror, add the domain to `/etc/docker/daemon.json` ([partial available registry mirror](https://www.wangdu.site/course/2109.html)).

(Disadvantages: slower speed; Applicable scenarios: pulling external images)

modify daemon.json
```bash
sudo tee /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": ["https://xxx","https://xxx"]
}
EOF
```

restart docker
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Configure internal private repository

Deploy a private image repository of your own configuration within the internal network.

(Disadvantages: Lack of external mirrors; Applicable scenarios: Mirrors required by the storage system itself, or for storing external mirrors)

### Set up a private repository (skip if a private repository already exists)

Select a Linux host that can be connected to within the intranet (here take 114.212.87.136 as an example).

Run `registry` to build the Docker repository
```bash
# Create image storage directory
mkdir -p /data/registry
# Pull image
docker pull registry
# Run registry
docker run -d --name registry -v /data/registry:/var/lib/registry -p 5000:5000 --restart=always -e REGISTRY_STORAGE_DELETE_ENABLED=true registry 
```

Check the running status
```bash
~$ sudo docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                                       NAMES
050306825f5f   6a3edb1d5eb6   "/entrypoint.sh /etc…"   37 minutes ago   Up 32 minutes   0.0.0.0:5000->5000/tcp, :::5000->5000/tcp   frosty_raman
```

Modify the configuration file
```bash
# Remove the configuration file from the container
docker cp registry:/etc/docker/registry/config.yml ./config.yml
# Load the modified configuration file into the container
docker cp ./config.yml registry:/etc/docker/registry/config.yml 
# Restart container
docker restart registry
```

Create UI for private repository
```bash
docker run -d \
  --name registry-ui \
  -p 8080:80 \
  -e REGISTRY_TITLE="xxx" \  # Enter the name you want to display on the front end.
  -e REGISTRY_URL="http://114.212.87.136:5000" \  # Enter IP
  -e SINGLE_REGISTRY=true \
  -e DELETE_IMAGES=true \
  -e SHOW_CATALOG_NB_TAGS=true \
  --link registry \
  --restart=always \
  joxit/docker-registry-ui:latest
 
# Visit http://114.212.87.136:8080 to view the page
```

Regularly recycle garbage (files still exist after deleting the mirror index)
```bash
docker exec -it registry registry garbage-collect  /etc/docker/registry/config.yml | grep "blob eligible for deletion:"
```

### Client settings to use private repositories

Set up on devices that need to use the private repository
```bash
# set hostname
sudo vim /etc/hosts
# add
114.212.87.136 repo

# configure docker daemon
sudo vim /etc/docker/daemon.json
# add
{
    "insecure-registries": ["repo:5000", "114.212.87.136:5000"]
}

# restart docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Use private repository
```bash
# tag image
docker tag dayuhub/backend:v1.0 repo:5000/dayuhub/backend:v1.0
# or: docker tag dayuhub/backend:v1.0 114.212.87.136:5000/dayuhub/backend:v1.0

# push image
docker push repo:5000/dayuhub/backend:v1.0
# or: docker push 114.212.87.136:5000/dayuhub/backend:v1.0

# pull image
docker pull repo:5000/dayuhub/backend:v1.0
# or: docker pull 114.212.87.136:5000/dayuhub/backend:v1.0
```

When compiling and building images in the dayu system, please configure env parameter `REG` and `buildkitd.toml` to use the private repository. For details, please refer to [Build Components](/docs/developer-guide/how-to-build/build-components#quick-building).


