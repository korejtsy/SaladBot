FROM node:9

WORKDIR /tmp
COPY ./package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/
RUN npm i
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN ls -l && npm i

