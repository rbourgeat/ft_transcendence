FROM	node:12-alpine

RUN		mkdir -p /usr/app
WORKDIR	/usr/app

COPY	package.json tsconfig.json wait.sh ./
COPY	src ./src

COPY	src/view ./views

ADD		https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN		chmod +x /wait
RUN		npm install 

EXPOSE	80

CMD		/wait && npm start