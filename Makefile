GLOBAL_ENV_FILE_PATH="config/local.env"
GATEWAY_ENV_FILE_PATH="gateway/config/local.env"
MS_USERS_ENV_FILE_PATH="ms-users/config/local.env"
MS_COMMENTS_ENV_FILE_PATH="ms-comments/config/local.env"

include $(PWD)/config/local.env

all: help

help:
	@echo "help                  			# this help"
	@echo "dev                   			# run all developers containers in background"
	@echo "dev-stop              			# stop all developers containers"
	@echo "dev-clear             			# stop all developers containers and clear all unusable data"
	@echo "prune                 			# clear all unusable data (prune unusable containers, images amd volumes)"

#gateway-intstall:
#	cd gateway && (yarn install) & wait
#
#ms-users-install:
#	cd ms-users && (yarn install) & wait
#
#ms-comments-install:
#	cd ms-comments && (yarn install) & wait
#
#install: gateway-intstall ms-users-install ms-comments-install

install:
	(cd gateway && make install) & wait
	(cd ms-users && make install) & wait
	(cd ms-comments && make install) & wait

build:
	(cd gateway && make build) & wait
	(cd ms-users && make build) & wait
	(cd ms-comments && make build) & wait

#gateway-setup-docker:
#	cd gateway && (curl -fsSL https://get.docker.com | sh)
#	cd gateway && curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
#	cd gateway && chmod +x /usr/local/bin/docker-compose
#	cd gateway && docker -v && docker-compose -v
#
#ms-users-setup-docker:
#	cd ms-users && (curl -fsSL https://get.docker.com | sh)
#	cd ms-users && curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
#	cd ms-users && chmod +x /usr/local/bin/docker-compose
#	cd ms-users && docker -v && docker-compose -v
#
#ms-comments-setup-docker:
#	cd ms-comments && (curl -fsSL https://get.docker.com | sh)
#	cd ms-comments && curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
#	cd ms-comments && chmod +x /usr/local/bin/docker-compose
#	cd ms-comments && docker -v && docker-compose -v
#
#setup-docker: gateway-setup-docker ms-users-setup-docker ms-comments-setup-docker
#	curl -fsSL https://get.docker.com | sh
#	curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
#	chmod +x /usr/local/bin/docker-compose
#	docker -v && docker-compose -v

setup-docker:
	curl -fsSL https://get.docker.com | sh
	curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
	chmod +x /usr/local/bin/docker-compose
	docker -v && docker-compose -v

setup-network:
	docker network inspect api-network || docker network create api-network

dev-setup:
	(cd gateway && make dev-setup) & wait
	(cd ms-users && make dev-setup) & wait
	(cd ms-comments && make dev-setup) & wait
	cp -f config/dev.env config/local.env

dev-common:
	docker-compose -f docker-compose.yml --env-file ${GLOBAL_ENV_FILE_PATH} up -d


dev: setup-network dev-common
	(cd gateway && make dev) & wait
	(cd ms-users && make dev) & wait
	(cd ms-comments && make dev) & wait
	docker-compose -f docker-compose.yml --env-file ${GLOBAL_ENV_FILE_PATH} up -d
#	cd gateway && docker-compose -f docker-compose.yml --env-file ${GATEWAY_ENV_FILE_PATH} up -d
#	cd ms-users && docker-compose -f docker-compose.yml --env-file ${MS_USERS_ENV_FILE_PATH} up -d
#	cd ms-comments && docker-compose -f docker-compose.yml --env-file ${MS_COMMENTS_ENV_FILE_PATH} up -d

dev-stop:
	(cd gateway && make dev-stop) & wait
	(cd ms-users && make dev-stop) & wait
	(cd ms-comments && make dev-stop) & wait
	docker-compose -f docker-compose.yml --env-file ${GLOBAL_ENV_FILE_PATH} down
#	cd gateway && docker-compose -f docker-compose.yml --env-file ${GATEWAY_ENV_FILE_PATH} down
#	cd ms-users && docker-compose -f docker-compose.yml --env-file ${MS_USERS_ENV_FILE_PATH} down
#	cd ms-comments && docker-compose -f docker-compose.yml --env-file ${MS_COMMENTS_ENV_FILE_PATH} down

prune:
	docker container prune -f
	docker image prune -f
	docker volume prune -f

dev-clear: dev-stop prune
	(cd gateway && make dev-clear) & wait
	(cd ms-users && make dev-clear) & wait
	(cd ms-comments && make dev-clear) & wait

