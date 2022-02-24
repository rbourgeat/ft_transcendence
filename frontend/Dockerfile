# FROM node:10 AS ui-build
# WORKDIR /usr/src/app
# COPY /frontend/typescript-react-app ./my-app/
# RUN cd my-app && npm install

# # FROM node:10 AS server-build
# # WORKDIR /usr/src/app
# # COPY api/ ./api/
# # RUN cd api && npm install && npm run build

# EXPOSE 3080

# # CMD ["node", "./api.bundle.js"]

# CMD ["npm", "start:dev"]

# FROM node:10

# # Create app directory for Real World React example app
# # NOTE: all the directives that follow in the Dockerfile will be executed in
# # that directory.
# WORKDIR /usr/src/app

# # Copy the package.json file into our app directory
# COPY /frontend/typescript-react-app /usr/src/app

# Install any needed packages specified in package.json
# RUN npm install

# RUN ls /usr/src/app
# RUN ls /usr/src/app/public

# EXPOSE 3000

# EXPOSE 8080

# CMD npm start

# pull the base image
# FROM node:alpine

# # set the working direction
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./

# COPY package-lock.json ./

# RUN npm install

# # add app
# COPY . ./

# # start app
# CMD ["npm", "start"]

# FROM node:14.9

# WORKDIR /usr/src/app

# COPY package.json ./package.json
# COPY package-lock.json ./package-lock.json


# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "start" ]

FROM node
WORKDIR /app
COPY ./frontend/typescript-react-app/package.json .
COPY ./frontend/typescript-react-app/package-lock.json .
COPY ./frontend/typescript-react-app .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]