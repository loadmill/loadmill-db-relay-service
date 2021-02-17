const redis = require("redis");
const { promisify } = require("util");

const runQuery = async (connectionString, command, key, field) => {
  let client;

  try {
    client = redis.createClient(connectionString);
    client.on("error", error => {
      client.quit();
    });

    let asyncCommand;
    const args = [key];

    switch (command) {
      case 'get':
        asyncCommand = promisify(client.get).bind(client);
        break;
      case 'hget':
        asyncCommand = promisify(client.hget).bind(client);
        args.push(field);
        break;
      case 'hgetall':
        asyncCommand = promisify(client.hgetall).bind(client);
        break;
      default:
        asyncCommand = promisify(client.get).bind(client);
        break;
    }

    const res = await asyncCommand.apply(null, args);
    return res;
  }
  catch { }
  finally {
    client.quit()
  }

}

module.exports = {
  runQuery
};