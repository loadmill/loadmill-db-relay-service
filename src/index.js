const express = require('express')
const bodyParser = require('body-parser')
const cluster = require('cluster');
const { ValidationError } = require('express-validation')
const apiRouter = require('./api-router');
const port = process.env.PORT || process.argv[2] || 8080;

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();
  });
}
else {
  const app = express()

  const fixieUrl = process.env.FIXIE_SOCKS_HOST;

  app.use(bodyParser.json())
  
  app.use('/api', apiRouter);

  app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
  })

  app.listen(port, () => {
    console.log(` worker ${process.pid}, app listening at port ${port}`)
  })

}
