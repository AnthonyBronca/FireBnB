list all containers

```sh
docker ps
```

list all images

```sh
docker images
```

docker compose for dev file:

```sh
docker compose -f docker-compose.dev.yml up
```

docker compose from scratch:

```sh
docker compose -f docker-compose.dev.yml up --build
```

docker compose without logs, building off the dev:

```sh
docker compose -f docker.compose.dev.yml up -d
```

view contents of a docker container

```sh
docker exec -it <containerID> sh
```
