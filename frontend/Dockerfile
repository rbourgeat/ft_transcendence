FROM node:17-alpine3.14
WORKDIR /app

# COPY ./typescript-react-app/package-lock.json .
COPY ./typescript-react-app/package.json .

RUN rm -rf node_modules

COPY ./typescript-react-app .
COPY ./typescript-react-app/.env .

RUN npm install --silent

EXPOSE 3030

CMD ["npm start"] 
