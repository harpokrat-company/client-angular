#!/bin/sh

eval $(minikube docker-env)
docker build -t "gcr.io/harpokrat-275013/hpk-web-app-nginx:$1" . -f ./Dockerfile
