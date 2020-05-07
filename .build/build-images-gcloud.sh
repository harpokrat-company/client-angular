#!/bin/sh

docker build -t "gcr.io/harpokrat-275013/hpk-web-app-nginx:$1" . -f ./Dockerfile
docker push "gcr.io/harpokrat-275013/hpk-web-app-nginx:$1"
