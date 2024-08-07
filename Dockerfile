FROM node:14.16.0-alpine
WORKDIR /usr/src/app/loadmill-db-relay-service

COPY . .
RUN yarn install --production

EXPOSE 8080
CMD ["node", "./src/index.js"]
