FROM node:17.8-alpine3.15

#Modification des regles pour que ca fonctionne a l ecole
WORKDIR /app
# WORKDIR /sgoinfre/goinfre/Perso/malatini/app

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN npm install --save bootstrap@latest
#RUN npm install -g npm@8.6.0

EXPOSE 3030

ENTRYPOINT npm install --legacy-peer-deps --silent && npm start
