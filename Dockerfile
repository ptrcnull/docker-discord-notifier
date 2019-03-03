FROM node:alpine
LABEL maintainer="Bjornskjald <github@bjorn.ml>"

COPY . /app

WORKDIR /app

RUN npm install

CMD [ "node", "index.js" ]