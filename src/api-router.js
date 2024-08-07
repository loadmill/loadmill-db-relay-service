const Router = require('express-promise-router');
const { validate } = require('express-validation');
const { sqlServerValidation: sqlServerValidation, redisValidation, mongoValidation, oracleValidation } = require('./validators/joi-validators');
const { runQuery: runPostgresQuery } = require('./handlers/postgres');
const { runQuery: runMysqlQuery } = require('./handlers/mysql');
const { runQuery: runRedisQuery } = require('./handlers/redis');
const { runQuery: runMongoQuery } = require('./handlers/mongo');
const { runQuery: runOracleQuery } = require('./handlers/oracle');
const apiRouter = Router();

apiRouter.post('/postgres', validate(sqlServerValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString,
      query
    }
  } = req;

  console.log('going to run postgres query', query);
  const result = await runPostgresQuery(connectionString, query);
  console.log('got postgres result', result);
  res.send({ result });
});

apiRouter.post('/oracle', validate(oracleValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString,
      user,
      password,
      query
    }
  } = req;
  console.log('going to run oracle query', query);
  const result = await runOracleQuery(connectionString, user, password, query);
  console.log('got oracle result', result);
  res.send({ result });
});

apiRouter.post('/mysql', validate(sqlServerValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString,
      query
    }
  } = req;

  console.log('going to run mysql query', query);
  const result = await runMysqlQuery(connectionString, query);
  console.log('got mysql result', result);
  res.send({ result });
});

apiRouter.post('/redis', validate(redisValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString,
      key,
      command,
      field
    }
  } = req;

  console.log('going to run redis query', command, key, field);
  const result = await runRedisQuery(connectionString, command, key, field);
  console.log('got redis result', result);
  res.send({ result });
});

apiRouter.post('/mongo', validate(mongoValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString, 
      collection, 
      command, 
      query,
      useUnifiedTopology,
      update,
    }
  } = req;

  console.log('going to run mongo query', collection, command, query, update);
  const result = await runMongoQuery(connectionString, collection, command, query, update, useUnifiedTopology);
  console.log('got mongo result', result);
  res.send({ result });
});

module.exports = apiRouter;