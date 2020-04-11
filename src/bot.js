const log = require('./modules/logger');
const fs = require('fs');
const { Client, Collection } = require('discord.js');

const client = new Client();
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
log.info(`Loading a total of ${commandFiles.length} commands.`);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  log.debug('Loading command:', command.name);
  client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
log.info(`Loading a total of ${eventFiles.length} events.`);

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = file.split('.')[0];
  log.debug('Loading event:', eventName);
  client.on(eventName, event.bind(null, client));
  delete require.cache[require.resolve(`./events/${file}`)];
}

client.on('error', error => {
  log.error(error);
});

client.on('warn', warning => {
  log.warn(warning);
});

client.on('debug', debug => {
  log.debug(debug);
});

client.login(process.env.TOKEN).catch(err => {
  log.error(err.message);
});