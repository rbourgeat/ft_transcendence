DOCKER			= docker
COMPOSE 		= docker-compose

.PHONY : all build up down pause unpause clean fclean re

all		:
			$(COMPOSE) up --build

#build or rebuild services
build	:
			$(COMPOSE) build

# Creates and start containers
up:
			${COMPOSE} up

# Stops containers and removes containers, networks, volumes, and images created by up
down	:
			$(COMPOSE) down

# Pause containers
pause:
			$(COMPOSE) pause

# Unpause containers
unpause:
			$(COMPOSE) unpause

# down and make sure every containers are deleted
clean	:
			$(COMPOSE) down -v --rmi all --remove-orphans

# cleans and makes sure every volumes, networks and image are deleted
fclean	:	clean
			rm -rf database_data
			$(DOCKER) system prune --volumes --all --force
			$(DOCKER) network prune --force
			echo docker volume rm $(docker volume ls -q)
			$(DOCKER) image prune --force

# $(DOCKER) volume prune --force
re		:	fclean all
