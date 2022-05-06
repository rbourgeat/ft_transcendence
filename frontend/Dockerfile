FROM node:18-alpine3.15

RUN npm install -g npm@8.9.0

WORKDIR /app

RUN npm install --save-dev env-cmd
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add xsel
RUN npm install -g serve


EXPOSE 3030
#Commande pour dev
CMD npm install --legacy-peer-deps --silent && npm update --silent \
               && sed -i -- 's/color-adjust/print-color-adjust/g'  ./node_modules/postcss-loader/dist/cjs.js \
               && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/bootstrap/dist/css/bootstrap.css \
               && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/source-map-loader/dist/cjs.js \
               && npm start

# CMD npm install --legacy-peer-deps --silent && npm update --silent \
#     && sed -i -- 's/color-adjust/print-color-adjust/g'  ./node_modules/postcss-loader/dist/cjs.js \
#     && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/bootstrap/dist/css/bootstrap.css \
#     && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/source-map-loader/dist/cjs.js \
#     #&& npm run-script build
#     && npm run build
# ENTRYPOINT serve -l 3030 -s build
