DOCKER			= sudo docker
COMPOSE 		= sudo docker-compose
DATA_PATH 		= /Users/transcendence/data

.PHONY : 	all build up down pause unpause clean fclean re

all		:	build
			sudo mkdir -p $(DATA_PATH)
			sudo mkdir -p $(DATA_PATH)/frontend
			sudo mkdir -p $(DATA_PATH)/database
			sudo chmod 777 /etc/hosts
			sudo echo "127.0.0.1 ft_transcendence.42.fr" >> /etc/hosts
			$(COMPOSE) up -d

#build or rebuild services
build	:
			$(COMPOSE) build

# Creates and start containers
up:
			${COMPOSE} up -d 

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
			$(DOCKER) system prune --volumes --all --force
			sudo rm -rf $(DATA_PATH)
			$(DOCKER) network prune --force
			echo docker volume rm $(docker volume ls -q)
			$(DOCKER) image prune --force

re		:	fclean all
