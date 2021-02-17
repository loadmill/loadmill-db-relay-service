const Router = require('express-promise-router');
const { validate } = require('express-validation');
const { postrgesValidation, redisDbValidation } = require('./validators/joi-validators');
const { runQuery: runPostgresQuery } = require('./handlers/postgres');
const { runQuery: runRedisQuery } = require('./handlers/redis');
const apiRouter = Router();

apiRouter.post('/postgres', validate(postrgesValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString,
      query
    }
  } = req;

  console.log('going to postgres run query', query);
  const result = await runPostgresQuery(connectionString, query);
  console.log('got postgres result', result);
  res.send({ result });
});

apiRouter.post('/redis', validate(redisDbValidation, {}, {}), async (req, res) => {
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

module.exports = apiRouter;