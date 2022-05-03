FROM node:18-alpine3.15

RUN npm install -g npm@8.8.0

WORKDIR /app

#RUN npm install -g npm@8.8.0
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN npm install --save bootstrap@latest
RUN apk add xsel
RUN npm install -g serve


#ARG TEST

#ENV TEST $TEST

EXPOSE 3030
#Commande pour dev
CMD npm install --legacy-peer-deps --silent && npm update --silent \
                && sed -i -- 's/color-adjust/print-color-adjust/g'  ./node_modules/postcss-loader/dist/cjs.js \
                && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/bootstrap/dist/css/bootstrap.css \
                && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/source-map-loader/dist/cjs.js \
                && npm start

#Command pour build - a retester (est-ce que le build est bien mis à jour ?)
#CMD npm install --legacy-peer-deps --silent && npm update --silent \
#    && sed -i -- 's/color-adjust/print-color-adjust/g'  ./node_modules/postcss-loader/dist/cjs.js \
#    && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/bootstrap/dist/css/bootstrap.css \
#    && sed -i -- 's/color-adjust/print-color-adjust/g' ./node_modules/source-map-loader/dist/cjs.js \
#    && npm run-script build 
#ENTRYPOINT serve -l 3030 -s build
