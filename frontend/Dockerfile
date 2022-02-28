FROM node
WORKDIR /app
COPY ./typescript-react-app/package.json .
COPY ./typescript-react-app/package-lock.json .
COPY ./typescript-react-app .
RUN npm install -g npm@8.5.2
RUN npm install
EXPOSE 3030
CMD ["npm", "start"]