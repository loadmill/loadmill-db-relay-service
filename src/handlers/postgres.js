const { Client } = require('pg')
const SocksConnection = require('socksjs');

const fixieUrl = process.env.FIXIE_SOCKS_HOST || 'fixie:VuZN5r5LbO1j6qy@speedway.usefixie.com:1080';
const fixieValues = fixieUrl? fixieUrl.split(new RegExp('[/(:\\/@)/]+')) : [];

  console.log("fixieValues", fixieValues);

const runQuery = async (connectionString, query) => {

  const postgresValues = connectionString.split(new RegExp('[/(:\\/@)/]+'));

  console.log("postgresValues", postgresValues);

  const pgServer = {
    host: postgresValues[3],
    port: postgresValues[4]
  };
  
  const fixieConnection = new SocksConnection(pgServer, {
    user: fixieValues[0],
    pass: fixieValues[1],
    host: fixieValues[2],
    port: fixieValues[3],
  });

  const client = new Client({
    user: postgresValues[1],
    password: postgresValues[2],
    database: postgresValues[5],
    stream: fixieConnection,
    ssl: {
      rejectUnauthorized: false,
    }
  });

  try {
    client.connect();
    const res = await client.query(query);
    return res.rows;
  }
  catch (err) {
    console.error(err);
    throw { err: err.toString() };
  }
  finally {
    client.end()
  }

}

module.exports = {
  runQuery
};