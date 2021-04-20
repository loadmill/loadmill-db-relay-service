const MongoClient = require('mongodb').MongoClient;
const runQuery = async (connectionString, collectionName, command, query = {}) => {

  if (process.env.ALLOWED_DOMAINS) {
    allowedDomains = process.env.ALLOWED_DOMAINS.split(',');
    if (!allowedDomains.includes(getHost(connectionString))) {
      throw { err: 'Domain is not allowed' };
    }
  }

  let client;
  try {
    client = await MongoClient.connect(connectionString);
    const db = client.db();
    return db.collection(collectionName)[command](query).toArray();
  }
  catch (err) {
    throw { err: err.toString() };
  }
  finally {
    client.close();
  }
}

const getHost = connectionString => {
  const regexExpression = connectionString.indexOf('@') >= 0 ? /(?<=(@))(.*)(?=:)/ : /(?<=\/\/)(.*)(?=:)/;
  const tokens = regexExpression.exec(connectionString);

  if (Array.isArray(tokens)) {
    const host = tokens[0];
    return host.indexOf(":") >= 0 ? host.split(':')[0] : host;
  }
  else {
    throw { err: 'Connection string is not valid' }
  }
}

module.exports = {
  runQuery
};