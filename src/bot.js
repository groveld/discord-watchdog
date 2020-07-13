const { Client, Collection } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/register');
const logger = require('./utils/logger');

const client = new Client();
client.commands = new Collection();

(async () => {
  await registerEvents(client, '../events');
  await registerCommands(client, '../commands');

  client.login(process.env.BOT_TOKEN)
    .catch(error => logger.error(error.message));
})();

client.on('error', error => logger.error(error));

client.on('warn', warning => logger.warn(warning));

client.on('debug', debug => logger.debug(debug));
