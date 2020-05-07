#!/bin/sh

#kubectl set image deployment/hpk-api nginx=harpokrat/api-nginx:latest php=harpokrat/api-php:latest --record

kubectl delete deployment/hpk-api && kubectl apply -k ./.build/
