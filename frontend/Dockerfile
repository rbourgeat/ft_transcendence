FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY /frontend/typescript-react-app ./my-app/
RUN cd my-app && npm install

# FROM node:10 AS server-build
# WORKDIR /usr/src/app
# COPY api/ ./api/
# RUN cd api && npm install && npm run build

EXPOSE 3080

# CMD ["node", "./api.bundle.js"]

CMD ["echo", "welcome"]