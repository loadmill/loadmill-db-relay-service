const mysql = require('mysql')
const util = require('util')

const runQuery = async (connectionString, query) => {
  const connection = mysql.createConnection(connectionString);
  const queryMysql = util.promisify(connection.query.bind(connection))
  connection.connect();

  try {
    const res = await queryMysql(query);
    return res;
  } catch (err) {
    throw { err: err.toString() };
  }

}

module.exports = {
  runQuery
};