FROM node:10.16.0
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
CMD node ./server/server.js
EXPOSE 3000