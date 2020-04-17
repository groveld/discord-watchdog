const log = require('../modules/logger');
// const db = require('../database/db');

module.exports = async (client) => {
  // Why await here? Because the ready event isn't actually ready, sometimes guild information will come in *after* ready.
  await new Promise(r => setTimeout(r, 2000));

  // Initialize the dashboard.
  // require("../dashboard/dashboard.js")(client);

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  // const guilds = await client.shard.broadcastEval('this.guilds.cache.map(g => g.id)')
  //   .then(id => {
  //     for (let i = 0; i < id.length; i++) {
  //       log.info(id[i]);
  //       db.guild.create({ guildID: id[i] });
  //     }
  //   });

  client.user.setPresence({ activity: { type: 'PLAYING', name: 'with discord.js' }, status: 'online' });

  // Log that we're ready to serve, so we know the bot accepts commands.
  log.info(`${client.user.tag}, ready to serve.`);
};