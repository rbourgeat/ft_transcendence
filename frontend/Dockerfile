FROM node:17-alpine3.14

#Modification des regles pour que ca fonctionne a l ecole
#WORKDIR /app
WORKDIR /sgoinfre/goinfre/Perso/malatini/app

EXPOSE 3030

# RUN npm install -g npm@8.5.4 && npm install @types/jest @types/node @types/react @types/react-dom
# RUN npm install -g create-react-app
# RUN npm install --save react react-dom react-scripts
# RUN npm install react-scripts axios bootstrap create-react-app express-fileupload form-data react react-alert react-bootstrap react-burger-menu react-cookie react-dom react-icons
# RUN npm install react-router-dom@5.0.0 react-testing-library react-toastify react-transition-group react-type-animation react-use-window-size redux sass
# RUN npm install socket.io-client web-vitals react-time-picker
# ENTRYPOINT rm -rf node_modules/ && npm install && npm start

ENTRYPOINT npm install && npm start
