# kubernetes

Run docker

Make an image from `foo` and `bar`

	cd foo && docker build -t h0x91b/foo:v1 .
	cd bar && docker build -t h0x91b/bar:v1 .

Run this to see created image

	docker images

Run images

	cd foo/ && docker run -p 3001:3001 $(docker images | grep h0x91b/foo | awk '{print $3}')
	cd bar/ && docker run -p 3002:3002 $(docker images | grep h0x91b/bar | awk '{print $3}')

Check

	http://127.0.0.1:3001/
	http://127.0.0.1:3002/

Push image, you will need to authorize your docker firstly

	docker login

Then push images

	docker push h0x91b/foo:v1
	docker push h0x91b/bar:v1

Prepare local kubernetes
===

Install minikube

	brew cask install minikube

Install driver for hyperkit that docker uses on OS X by default, e.g. run kubernetes using hyperkit virtualization

	curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit \ 
	&& sudo install -o root -m 4755 docker-machine-driver-hyperkit /usr/local/bin/

Set hyperkit as default driver

	minikube config set vm-driver hyperkit

Start minikube

	minikube start --vm-driver=hyperkit

Open minikube dashboard

	minikube dashboard

# kubernetes finally

Apply apps

	cd kube/foo && kubectl apply -f deployment.yml 
	cd kube/bar && kubectl apply -f deployment.yml 

List pods

	kubectl get pods 

Attach shell to one of them

	kubectl exec -ti $(kubectl get pods | grep kube-foo-app | awk '{print $1}') sh

Apply service

	cd kube/foo && kubectl apply -f service.yml 
	cd kube/bar && kubectl apply -f service.yml 

List services

	kubectl get svc

Check what IP of minikube

	minikube ip

Open service in web

	open $(printf "http://%s:32001/" $(minikube ip))