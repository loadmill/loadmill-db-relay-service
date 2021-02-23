FROM node:12.15.0 as builder
WORKDIR /usr/src/app/loadmill-db-relay-service

COPY . .
RUN yarn install --production

EXPOSE 8080
CMD ["node", "./src/index.js"]
