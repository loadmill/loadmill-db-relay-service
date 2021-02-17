# loadmill-db-relay-service
Enable customers to execute queries directly to their DB


## Usage


Execute queries directly to postgres:

https://loadmill-db-relay-service/api/postgres

```js

body: {
  connectionString: 'postgres://...'
  query: 'SELECT NOW()'
}
```

Execute queries directly to redis:

https://loadmill-db-relay-service/api/redis

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

