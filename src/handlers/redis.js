const redis = require("redis");
const { promisify } = require("util");

const runQuery = async (connectionString, command, key, field) => {
  let client;

  try {
    client = redis.createClient(connectionString);
    client.on("error", error => {
      client.quit();
    });

    const args = [key];

    if (command === 'hget') {
      args.push(field);
    }
    
    const asyncCommand = promisify(client[command]).bind(client);
    const res = await asyncCommand.apply(null, args);
    return res;
  }
  finally {
    client.quit()
  }

}

module.exports = {
  runQuery
};