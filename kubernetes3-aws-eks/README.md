# kubernetes on amazon EKS

(https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)

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

Prepare Amazon EKS
===

https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html

Open dashboard via local proxy:

	open "http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/overview"

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

Ingress ALB
===

https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html

Create a policy

	aws iam create-policy \
		--policy-name ALBIngressControllerIAMPolicy \
		--policy-document file://iam-policy.json

Check role name

	kubectl -n kube-system describe configmap aws-auth

Apply role

	aws iam attach-role-policy \
		--policy-arn arn:aws:iam::184889795389:policy/ALBIngressControllerIAMPolicy \
		--role-name eksctl-prod-nodegroup-standard-wo-NodeInstanceRole-11QC2YW8M9Z02

Create a service account

	kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/v1.1.2/docs/examples/rbac-role.yaml

Deploy ingress controller

	kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/v1.1.2/docs/examples/alb-ingress-controller.yaml

Apply ingress

	kubectl apply -f kube/ingress.yml

Open it via ingress

	open $(printf "http://%s/" $(minikube ip))

# Clean up

	kubectl delete -f kube/ingress.yml
	kubectl delete -f kube/env/service.yml
	kubectl delete -f kube/env/deployment-fs.yml
	kubectl delete -f kube/persistent-volume.yml
	kubectl delete -f kube/secret.yml
	kubectl delete -f kube/config-map.yml
