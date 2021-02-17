const express = require('express')
const bodyParser = require('body-parser')
const { ValidationError } = require('express-validation')
const apiRouter = require('./api-router');
const port = process.env.PORT || process.argv[2] || 8000;
const app = express()

app.use(bodyParser.json())

app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
 
  return res.status(500).json(err)
})

app.listen(port, () => {
  console.log(`app listening at port ${port}`)
})