
# K8s


For testing use, the simpler solution is to install minikube.

Once Minikube has been installed and started, you need to build the docker
images of you app *inside* the minikube environment (see
`.build/build-images-minikube.sh`)


If using Google Cloud (production environment for example), you instead need to
build the images on your machine, then push them to the GCloud registry (in
that case, the `kustomization.yaml` has to reflect this change, with images
being `gcr.io/${PROJECT_ID}/image-name:v1`)
```
gcloud auth configure-docker
.build/build-images-gcloud.sh
```


Secrets (usually environment variables) have to be put in secrets.yaml, and
have to be writen in base64 encoding (`echo -n "aled" | base64`). See example
file for the yaml structure.


to simply "deploy" the app, you can run `kubectl apply -k ./.build/` which will
use the `kustomisation.yaml` file to create multiple pods.


Network ports are only accessible through services, and in minikube evironment,
to get infos about where it is open, you need to run: `minikube service hpk-api --url`
In the Google Cloud environment, use `kubectl get service`


## run

```
# If not using Google Cloud, start test minikube "cluster"
minikube delete && minikube start --vm-driver=kvm2

# set kubectl to use the Google Cloud cluster
gcloud config set project harpokrat-275013
gcloud container clusters get-credentials web-app-cluster --region europe-west3-a

.build/build-images-minikube.sh
# OR
gcloud auth configure-docker
.build/build-images-gcloud.sh v1 # change version number here as needed

kubectl apply -k ./.build/
```

## update deployement

To update a running app in the GCloud K8s environment, you need to update the
docker image versions, and also in the kustomization.yaml file (to use the
newly built images) ; then `kubectl apply -k .build/`


## logs
```
kubectl get pods
kubectl logs [pod-name] -c php
```

