FROM node:14.17.3-buster

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json 

RUN npm install  

COPY . .

CMD ["npm", "run", "start"]