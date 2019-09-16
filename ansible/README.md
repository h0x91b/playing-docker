Ansible for docker
===

First of all `chmod 0600 docker.pem`


	pip3 install ansible


Full provisioning

local

	ansible-playbook -v -i local.hosts playbook.yml

prod

	ansible-playbook -v -i prod.hosts playbook.yml 
