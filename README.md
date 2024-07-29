# loadmill-db-relay-service

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

Loadmill's Database Relay Service provides a simple way to interact with your databases using HTTP requests as part of API and integration tests. By enabling the execution of queries directly to PostgreSQL, MySQL, Oracle, MongoDB, and Redis databases, it greatly simplifies the incorporation of databases in your API tests. The ability to query data sources and assert over the response during a test serves as a powerful tool for validating test results.

## Usage

Execute queries directly to postgres:

`https://<www.your-domain.com>/api/postgres`

```js

body: {
  connectionString: 'postgres://...'
  query: 'SELECT NOW()'
}
```

Execute queries directly to mysql:

`https://<www.your-domain.com>/api/mysql`

```js

body: {
  connectionString: 'mysql://...'
  query: 'SELECT NOW()'
}
```

Execute queries directly to oracle:

`https://<www.your-domain.com>/api/oracle`

```js

body: {
  connectionString: 'host[:port][/service_name]'
  user: 'database-user'
  password: 'mypw'
  query: 'SELECT * FROM table_name'
}
```

Execute queries directly to mongodb:

`https://<www.your-domain.com>/api/mongo`

```js

body: {
  connectionString: 'mongodb://...'
  collection: 'bios',
  command: 'find',
  query: { "awards.award": "Turing Award" }
}
```

Execute queries directly to redis:

`https://<www.your-domain.com>/api/redis`

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
