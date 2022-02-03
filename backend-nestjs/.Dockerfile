FROM	node:12-alpine

RUN		mkdir -p /usr/app
WORKDIR	/usr/app

COPY	package.json tsconfig.json ./
COPY	src ./src

ADD		https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN		chmod +x /wait
RUN		npm install 

EXPOSE	3000

CMD		/wait && npm start