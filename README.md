# loadmill-db-relay-service

Enable customers to execute queries directly to their DB.

## Usage

Execute queries directly to postgres:

https://<www.your-domain.com>/api/postgres

```js

body: {
  connectionString: 'postgres://...'
  query: 'SELECT NOW()'
}
```

Execute queries directly to mysql:

https://<www.your-domain.com>/api/mysql

```js

body: {
  connectionString: 'mysql://...'
  query: 'SELECT NOW()'
}
```

Execute queries directly to mongodb:

https://<www.your-domain.com>/api/mongo

```js

body: {
  connectionString: 'mongodb://...'
  collection: 'bios',
  command: 'find',
  query: { "awards.award": "Turing Award" }
}
```

Execute queries directly to redis:

https://<www.your-domain.com>/api/redis

```js

body: {
  {
    connectionString: "redis://...", 
    command:"get | hget | hgetall"
    key:"any-key",
    field: "any-field"
   }
}
```

## Usage

Build docker image:

```js
docker build -t db-relay-service .
```

Build docker container:

```js
docker run -it -p 8080:8080 db-relay-service
```

Stop docker container:

```js
docker ps 
docker stop ${CONTAINER ID}
```
