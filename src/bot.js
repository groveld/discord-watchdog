const { Client, Collection } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/register');
const logger = require('./utils/logger');

const client = new Client();
client.commands = new Collection();

(async () => {
  await registerEvents(client, '../events');
  await registerCommands(client, '../commands');

  client.login(process.env.BOT_TOKEN).catch(err => logger.error(err.message));
})();

client.on('error', err => logger.error(err));

client.on('warn', err => logger.warn(err));

client.on('debug', err => logger.debug(err));
