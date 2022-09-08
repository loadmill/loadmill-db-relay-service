const MongoClient = require('mongodb').MongoClient;
const runQuery = async (connectionString, collectionName, command, query = {}, useUnifiedTopology) => {

  if (process.env.ALLOWED_HOSTS) {
    allowedHosts = process.env.ALLOWED_HOSTS.split(',');
    if (!allowedHosts.includes(getHost(connectionString))) {
      throw { err: 'Host is not allowed' };
    }
  }

  let client;
  let opts = {};
  try {
    if (useUnifiedTopology) {
      opts = {useUnifiedTopology: true, useNewUrlParser: true};
    }
    client = await MongoClient.connect(connectionString, opts);
    const db = client.db();
    return await db.collection(collectionName)[command](query).toArray();
  }
  catch (err) {
    throw { err: err.toString() };
  }
  finally {
    client.close();
  }
}

const getHost = connectionString => {
  const regexExpression = connectionString.includes('@') ? /(?<=(@))(.*)(?=:)/ : /(?<=\/\/)(.*)(?=:)/;
  const tokens = regexExpression.exec(connectionString);

  if (Array.isArray(tokens)) {
    const host = tokens[0];
    return host.includes(":") ? host.split(':')[0] : host;
  }
  else {
    throw { err: 'Connection string is not valid' }
  }
}

module.exports = {
  runQuery,
  getHost
};