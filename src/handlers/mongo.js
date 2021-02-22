const MongoClient = require('mongodb').MongoClient;
const runQuery = async (connectionString, collectionName, command, query = {}) => {

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

module.exports = {
  runQuery
};