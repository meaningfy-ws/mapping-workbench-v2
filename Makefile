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