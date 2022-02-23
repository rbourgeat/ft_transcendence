FROM node:12

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 8080

#npm run start ?
CMD ["node", "main.js"]

#pb pour faire marcher 

#docker build -t nest-docker:1.0.0-dev . 
#docker run --rm -it --name back -p 3000:3000 nest-docker:1.0.0-dev
#docker run -p 49160:8080 -d nest-docker:1.0.0-dev/app-backend
#docker run -p 8080:3030 -d nest-docker:1.0.0-dev/app-backend