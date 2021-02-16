const { Client } = require('pg')

const runQuery = async (connectionString, query) => {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    }
  });

  try {
    client.connect();
    const res = await client.query(query);
    return res.rows;
  }
  catch { }
  finally {
    client.end()
  }

}

module.exports = {
  runQuery
};