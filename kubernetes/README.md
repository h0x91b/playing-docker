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

