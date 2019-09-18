# kubernetes - lesson 2 - env variables and file system

(https://www.youtube.com/watch?v=L8ipc7LOvdc)

Make an image from `env`

	docker build -t h0x91b/env:v4 env/

Run this to see created image

	docker images

Run an image

	docker run -p 3001:3001 $(docker images | grep h0x91b/env | awk '{print $3}')

Check

	http://127.0.0.1:3001/

Push image, you will need to authorize your docker firstly

	docker login

Then push image

	docker push h0x91b/env:v4

Prepare local kubernetes
===

Start minikube

	minikube start --vm-driver=hyperkit

Open minikube dashboard

	minikube dashboard

# ENV vars

Apply config-map

	kubectl apply -f kube/config-map.yml 

Apply secrets

	kubectl apply -f kube/secret.yml 

Apply app

	kubectl apply -f kube/env/deployment.yml 

List pods

	watch kubectl get pods 

Apply service

	kubectl apply -f kube/env/service.yml 

List services

	watch kubectl get svc

Apply ingress

	kubectl apply -f kube/ingress.yml

Open it via ingress

	open $(printf "http://%s/" $(minikube ip))

# FS

Apply persistent volumes

	kubectl apply -f kube/persistent-volume.yml

Apply new deployment

	kubectl apply -f kube/env/deployment-fs.yml 

Open ssh to minikube

	minikube ssh

Check the logs from a persistent storage

	tail -f /var/log/nodelogs/log.txt

# Clean up

	kubectl delete -f kube/ingress.yml
	kubectl delete -f kube/env/service.yml
	kubectl delete -f kube/env/deployment-fs.yml
	kubectl delete -f kube/persistent-volume.yml
	kubectl delete -f kube/secret.yml
	kubectl delete -f kube/config-map.yml
