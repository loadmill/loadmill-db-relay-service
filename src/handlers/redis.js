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
    const args = [key, field];
    switch (command) {
      case 'get':
        asyncCommand = promisify(client.get).bind(client);
        args.splice(1, 1);
        break;
      case 'hget':
        asyncCommand = promisify(client.hget).bind(client);
        break;
      case 'hgetall':
        asyncCommand = promisify(client.hgetall).bind(client);
        args.splice(1, 1);
        break;
      default:
        asyncCommand = promisify(client.get).bind(client);
        args.splice(1, 1);
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