# kubernetes - on gcloud

(https://youtu.be/L3tgJXsMUTU)

Make image and push it to private Google Container Registry, then use it to deploy on Google kubernetes cluster

Preparing
===

Install `gcloud` (https://cloud.google.com/sdk/docs/), select yes to update PATH...

	curl -L https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-263.0.0-darwin-x86_64.tar.gz > ~/google-cloud-sdk.tar.gz
	cd ~ && tar -xzvf ~/google-cloud-sdk.tar.gz
	./google-cloud-sdk/install.sh

Open a new shell to reload PATH
login to your account
choose default region (europe-west4-c, Netherlands is cheapest right now in europe)

	cd ~ && ./google-cloud-sdk/bin/gcloud init

Configure gcloud for docker

	gcloud auth configure-docker

Go to google cloud console kubernetes UI and press the "Connect" button on the correct cluster, then copy & run command

	gcloud container clusters get-credentials cluster-g1 --zone europe-west4-a --project h0x91b-140109

Dashboard is disabled by default, deploy it

	kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yaml

Run local proxy in new tab, and remain it open

	kubectl proxy

Open a dashboard

	open "http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/."

To get an access token for login

	gcloud container clusters get-credentials cluster-g1 --zone europe-west4-a 
	gcloud config config-helper --format=json | jq -r '.credential.access_token'

Prepare image
===

Make an image from `demo-worker`

	docker build -t eu.gcr.io/h0x91b-140109/demo-worker:v5 demo-worker/

Run this to see created image

	docker images

Push image

	docker push eu.gcr.io/h0x91b-140109/demo-worker:v5 

# ENV vars

Apply config-map

	kubectl apply -f kube/config-map.yml 

Apply secrets

	kubectl apply -f kube/secret.yml 

Deploy
===

Apply app

	kubectl apply -f kube/demo-worker/deployment.yml 

List pods

	watch kubectl get pods 

We can connect exec ssh on some pod if needed, for example to some of demo-worker-app

	kubectl exec -ti $(kubectl get pods | grep demo-worker-app | head -n 1 | awk '{print $1}') sh

Apply service

	kubectl apply -f kube/demo-worker/service.yml 

List services

	watch kubectl get svc

You can proxy remote port on some Pod to local machine for debug
For example: lets proxy port 3001 from first kube-demo-worker-app to local 8070

	kubectl port-forward $(kubectl get pods | grep demo-worker-app | head -n 1 | awk '{print $1}') 8070:3001

Then open it in browser

	open "http://127.0.0.1:8070/healthz"

# Ingress

(https://cloud.google.com/kubernetes-engine/docs/how-to/load-balance-ingress)

Apply ingress

	kubectl apply -f kube/ingress.yml

Wait for IP (5+ minutes)

	watch kubectl get ingress

Open it via ingress

	open $(printf "http://%s/" $(minikube ip))

# Clean up

	kubectl delete -f kube/ingress.yml
	kubectl delete -f kube/demo-worker/service.yml
	kubectl delete -f kube/demo-worker/deployment-fs.yml
	kubectl delete -f kube/secret.yml
	kubectl delete -f kube/config-map.yml

# Delete cluster

Use the UI.