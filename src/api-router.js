const Router = require('express-promise-router');
const { validate } = require('express-validation');
const { relationalDbValidation } = require('./validators/joi-validators');
const { runQuery } = require('./handlers/postgres');
const apiRouter = Router();

apiRouter.post('/postgres', validate(relationalDbValidation, {}, {}), async (req, res) => {
  const {
    body: {
      connectionString,
      query
    }
  } = req;

  console.log('going to run query', query);
  const result = await runQuery(connectionString, query)
  res.send(result);
})

module.exports = apiRouter;