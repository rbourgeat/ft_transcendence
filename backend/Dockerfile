FROM node:18-alpine3.15

RUN npm install -g npm@8.9.0

WORKDIR /app_backend

CMD mkdir upload

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

RUN npm i -g @nestjs/cli

EXPOSE 3000

#pour dev
ENTRYPOINT npm install --silent && npm run start:dev

#ENTRYPOINT npm install --silent && npm run start:prod
