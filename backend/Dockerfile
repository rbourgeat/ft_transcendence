FROM node:16-alpine3.14

WORKDIR /app_backend

CMD mkdir upload

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

# Install dependencies required for project
RUN npm i -g @nestjs/cli

EXPOSE 3000

ENTRYPOINT npm install && npm run start:dev
