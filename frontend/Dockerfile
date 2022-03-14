FROM node:17-alpine3.14

#Modification des regles pour que ca fonctionne a l ecole
#WORKDIR /app
WORKDIR /sgoinfre/goinfre/Perso/malatini/app

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

EXPOSE 3030

<<<<<<< HEAD
RUN npm install -g npm@8.5.4 && npm install @types/jest @types/node @types/react @types/react-dom
RUN npm install -g create-react-app
RUN npm install --save react react-dom react-scripts
RUN npm install react-scripts axios bootstrap create-react-app express-fileupload form-data react react-alert react-bootstrap react-burger-menu react-cookie react-dom react-icons
RUN npm install react-router-dom@5.0.0 react-testing-library react-toastify react-transition-group react-type-animation react-use-window-size redux sass
RUN npm install socket.io-client  web-vitals
=======
# RUN npm install -g npm@8.5.4 && npm install @types/jest @types/node @types/react @types/react-dom
# RUN npm install -g create-react-app
# RUN npm install --save react react-dom react-scripts
# RUN npm install react-scripts axios bootstrap create-react-app express-fileupload form-data react react-alert react-bootstrap react-burger-menu react-cookie react-dom react-icons
# RUN npm install react-router-dom@5.0.0 react-testing-library react-toastify react-transition-group react-type-animation react-use-window-size redux sass
# RUN npm install socket.io-client web-vitals react-time-picker
>>>>>>> aa8f0d8b6b02daa21ebeb54b84902d8d7adf1c10

ENTRYPOINT npm install && npm start
