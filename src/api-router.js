const Router = require('express-promise-router');
const { validate } = require('express-validation');
const { postrgesValidation, redisValidation, mongoValidation } = require('./validators/joi-validators');
const { runQuery: runPostgresQuery } = require('./handlers/postgres');
const { runQuery: runRedisQuery } = require('./handlers/redis');
const { runQuery: runMongoQuery } = require('./handlers/mongo');
const apiRouter = Router();

apiRouter.get('/', async (req, res) => {
  res.sendStatus(200);
});

apiRouter.post('/postgres', validate(postrgesValidation, {}, {}), async (req, res) => {
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
      query
    }
  } = req;

  console.log('going to run mongo query', collection, command, query);
  const result = await runMongoQuery(connectionString, collection, command, query);
  console.log('got mongo result', result);
  res.send({ result });
});

module.exports = apiRouter;