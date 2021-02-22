# loadmill-db-relay-service
Enable customers to execute queries directly to their DB


## Usage


Execute queries directly to postgres:

https://db-relay-service.loadmill.com/api/postgres

```js

body: {
  connectionString: 'postgres://...'
  query: 'SELECT NOW()'
}
```

Execute queries directly to mongodb:

https://db-relay-service.loadmill.com/api/mongo

```js

body: {
  connectionString: 'mongodb://...'
  collection: 'bios',
  command: 'find',
  query: { "awards.award": "Turing Award" }
}
```


Execute queries directly to redis:

https://db-relay-service.loadmill.com/api/redis

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

