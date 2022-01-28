FROM node:14.17.3-buster

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json 

RUN npm install  

COPY . .

CMD ["npm", "run", "start"]

#docker build -t react-docker:1.0.0-dev . 
#docker run --rm -it --name web -p 3000:3000 react-docker:1.0.0-dev

# pull official base image
#FROM node:13.12.0-alpine



# FROM node:13.12.0-alpine

# #set working directory
# WORKDIR /app

# RUN npm install react
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install react-router-dom -g --silent
# RUN npm install bootstrap -g --silent
# RUN npm install react-icons -g --silent
# RUN npm install react-bootstrap -g --silent
# RUN npm i -g install --save typescript @types/node @types/react @types/react-dom @types/jest

# #add frontend to docker container
# COPY . ./

# #launch frontend app
# CMD [ "npm", "start" ]

# RUN npm install nodemon -g

# # set working directory
# WORKDIR /app

# ADD . /app

# # add app
# COPY package.json ./
# COPY package-lock.json ./
# COPY . ./
# COPY package.json ./
# RUN npm install -g
# COPY ./ ./ 
# EXPOSE 3000

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install react-router-dom -g --silent
# RUN npm install bootstrap -g --silent
# RUN npm install react-icons -g --silent
# RUN npm install react-bootstrap -g --silent
# RUN npm i -g install --save typescript @types/node @types/react @types/react-dom @types/jest

# start app
# CMD ["npm", "start"]