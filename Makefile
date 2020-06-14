#makefile

.PHONY: build

build:
	docker build --network host -f docker/Dockerfile -t taskcenter-admin .

run:
	docker run --net host --name taskcenter-admin -d taskcenter-admin

clean:
	docker rm -f taskcenter-admin
