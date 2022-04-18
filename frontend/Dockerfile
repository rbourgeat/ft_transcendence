FROM node:17.8-alpine3.15

WORKDIR /app

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN npm install --save bootstrap@latest

EXPOSE 3030

#ENTRYPOINT npm install --legacy-peer-deps --silent && npm update && npm start
ENTRYPOINT npm install --legacy-peer-deps --silent && npm update --silent && npm start
