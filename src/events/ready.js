const log = require('../modules/logger');

module.exports = async (client) => {
  // Why await here? Because the ready event isn't actually ready, sometimes guild information will come in *after* ready.
  await new Promise(r => setTimeout(r, 2000));

  // Initialize the dashboard.
  // require("../modules/dashboard.js")(client);

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  // const offline = await client.settings.findAll({ attributes: ['guild'] }).map(t => parseInt(t.guild));
  // const online = client.guilds.map(t => parseInt(t.id));
  // online.filter(g => !offline.includes(g)).forEach(g => client.settings.create({ guild: g }));
  // offline.filter(g => !online.includes(g)).forEach(g => client.settings.destroy({ where: { guild: g } }));

  client.user.setPresence({ activity: { name: 'with discord.js' }, status: 'idle' });

  // Log that we're ready to serve, so we know the bot accepts commands.
  log.info(`${client.user.tag}, ready to serve.`);
};