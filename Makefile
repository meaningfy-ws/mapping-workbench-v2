SHELL=/bin/bash -o pipefail
BUILD_PRINT = \e[1;34mSTEP:
END_BUILD_PRINT = \e[0m

CURRENT_UID := $(shell id -u)
export CURRENT_UID
# These are constants used for make targets so we can start prod and staging services on the same machine
ENV_FILE := .env

# include .env files if they exist
-include .env

PROJECT_PATH = $(shell pwd)
HOSTNAME = $(shell hostname)
CAROOT = $(shell pwd)/infra/traefik/certs
NAME := mapping_workbench
DOCKER_PROJECT := ${NAME}_${ENVIRONMENT}



#-----------------------------------------------------------------------------
# SERVER SERVICES
#-----------------------------------------------------------------------------
build-externals:
	@ echo -e "$(BUILD_PRINT)Creating the necessary volumes, networks and folders and setting the special rights"
	@ docker network create proxy-net || true
	@ docker network create common-ext-${ENVIRONMENT} || true

start-traefik: build-externals
	@ echo -e "$(BUILD_PRINT)Starting the Traefik services $(END_BUILD_PRINT)"
	@ docker-compose -p common --file ./infra/traefik/docker-compose.yml --env-file ${ENV_FILE} up -d

stop-traefik:
	@ echo -e "$(BUILD_PRINT)Stopping the Traefik services $(END_BUILD_PRINT)"
	@ docker-compose -p common --file ./infra/traefik/docker-compose.yml --env-file ${ENV_FILE} down


start-server-services: | start-traefik
stop-server-services: | stop-traefik

#-----------------------------------------------------------------------------
# PROJECT SERVICES
#-----------------------------------------------------------------------------
start-redis:
	@ echo -e "$(BUILD_PRINT)Starting the Redis services $(END_BUILD_PRINT)"
	@ docker-compose -p common --file ./infra/redis/docker-compose.yml --env-file ${ENV_FILE} up -d

stop-redis:
	@ echo -e "$(BUILD_PRINT)Stopping the Redis services $(END_BUILD_PRINT)"
	@ docker-compose -p common --file ./infra/redis/docker-compose.yml --env-file ${ENV_FILE} down

start-fluree:
	@ echo -e "$(BUILD_PRINT)Starting the Fluree services $(END_BUILD_PRINT)"
	@ docker-compose -p common --file ./infra/fluree/docker-compose.yml --env-file ${ENV_FILE} up -d

stop-fluree:
	@ echo -e "$(BUILD_PRINT)Stopping the Fluree services $(END_BUILD_PRINT)"
	@ docker-compose -p common --file ./infra/fluree/docker-compose.yml --env-file ${ENV_FILE} down


start-backend:
	@ echo "Starting the BACKEND"
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/backend/docker-compose.yml --env-file ${ENV_FILE} up -d

stop-backend:
	@ echo "Stopping the BACKEND"
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/backend/docker-compose.yml --env-file ${ENV_FILE} down

build-backend:
	@ echo "Building the BACKEND"
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/backend/docker-compose.yml --env-file ${ENV_FILE} build --progress plain --no-cache --force-rm
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/backend/docker-compose.yml --env-file ${ENV_FILE} up -d --force-recreate


build-frontend:
	@ echo "Building the FRONTEND"
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/frontend/docker-compose.yml --env-file ${ENV_FILE} build --progress plain --no-cache --force-rm
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/frontend/docker-compose.yml --env-file ${ENV_FILE} up -d --force-recreate

start-frontend:
	@ echo "Starting the FRONTEND"
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/frontend/docker-compose.yml --env-file ${ENV_FILE} up -d

stop-frontend:
	@ echo "Stopping the FRONTEND"
	@ docker-compose -p ${DOCKER_PROJECT} --file ./infra/frontend/docker-compose.yml --env-file ${ENV_FILE} down

#-----------------------------------------------------------------------------
# TESTING
#-----------------------------------------------------------------------------


#-----------------------------------------------------------------------------
# VAULT SERVICES
#-----------------------------------------------------------------------------
# Testing whether an env variable is set or not
guard-%:
	@ if [ "${${*}}" = "" ]; then \
        echo -e "$(BUILD_PRINT)Environment variable $* not set $(END_BUILD_PRINT)"; \
        exit 1; \
	fi

# Testing that vault is installed
vault-installed: #; @which vault1 > /dev/null
	@ if ! hash vault 2>/dev/null; then \
        echo -e "$(BUILD_PRINT)Vault is not installed, refer to https://www.vaultproject.io/downloads $(END_BUILD_PRINT)"; \
        exit 1; \
	fi
# Get secrets in dotenv format

dev-dotenv-file:
	@ echo "Creating DEV .env file ... "
	@ echo VAULT_ADDR=${VAULT_ADDR} > ${ENV_FILE}
	@ echo VAULT_TOKEN=${VAULT_TOKEN} >> ${ENV_FILE}
	@ vault kv get -format="json" mapping-workbench-v2-dev/app | jq -r ".data.data | keys[] as \$$k | \"\(\$$k)=\(.[\$$k])\"" >> ${ENV_FILE}

staging-dotenv-file:
	@ echo "Creating STAGING .env file ... "
	@ echo VAULT_ADDR=${VAULT_ADDR} > ${ENV_FILE}
	@ echo VAULT_TOKEN=${VAULT_TOKEN} >> ${ENV_FILE}
	@ vault kv get -format="json" mapping-workbench-v2-staging/app | jq -r ".data.data | keys[] as \$$k | \"\(\$$k)=\(.[\$$k])\"" >> ${ENV_FILE}
