const oracledb = require('oracledb');

const runQuery = async (connectionString, user, password, query) => {
  const connection = await getOracleConnection(connectionString, user, password); 
  try {
    const result = await connection.execute(query, {}, { autoCommit: true });
    return result.rows;
  } catch (err) {
    throw { err: err.toString() };
  } finally {
    await connection.close();
  }
}

const getOracleConnection = async (connectionString, user, password) => {
  try {
    return await oracledb.getConnection ({
      connectString : connectionString,
      user,
      password
    });
  } catch (err) {
    throw { err: err.toString() };
  }
}

module.exports = {
  runQuery
};
