FROM node:17-alpine3.14

#Modification des regles pour que ca fonctionne a l ecole
WORKDIR /app
# WORKDIR /sgoinfre/goinfre/Perso/malatini/app

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

EXPOSE 3030

ENTRYPOINT npm install && npm start
