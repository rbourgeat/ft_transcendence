FROM node:17-alpine3.14
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY ./typescript-react-app/package.json .
# COPY ./typescript-react-app/package-lock.json .
# COPY ./typescript-react-app .
COPY ./typescript-react-app/.env .
# RUN rm -rf node_modules
# RUN rm -rf package-lock.json
RUN npm i -g npm@latest
RUN npm i -g serve
RUN npm install --silent
RUN npm install -g typescript

# RUN npm install --save react react-dom react-scripts
COPY . ./
# RUN rm -rf package-lock.json
EXPOSE 3030
RUN rm package-lock.json
# RUN npm run build
CMD ["npm", "start"]