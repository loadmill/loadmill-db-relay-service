const mysql = require('mysql');
const util = require('util');

const runQuery = async (connectionString, query) => {
  try {
    const connection = mysql.createConnection(connectionString);
    connection.connect();

    const queryMysql = util.promisify(connection.query.bind(connection));
    return await queryMysql(query);
  } catch (err) {
    throw { err: err.toString() };
  }
}

module.exports = {
  runQuery
};
