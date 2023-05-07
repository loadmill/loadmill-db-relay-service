const mysql = require('mysql');
const util = require('util');

const runQuery = async (connectionString, query) => {
  const connection = mysql.createConnection(connectionString);
  try {
    connection.connect();
    const queryMysql = util.promisify(connection.query.bind(connection));
    return await queryMysql(query);
  } catch (err) {
    throw { err: err.toString() };
  } finally {
    connection.end();
  }
}

module.exports = {
  runQuery
};
