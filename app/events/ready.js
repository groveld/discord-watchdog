module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes guild information will come in *after* ready.
  await client.wait(2000);

  // Initializes the dashboard.
  // require("../modules/dashboard.js")(client);

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  const offline = await client.settings.findAll({ attributes: ['guild'] }).map(t => parseInt(t.guild));
  const online = client.guilds.map(t => parseInt(t.id));
  online.filter(g => !offline.includes(g)).forEach(g => client.settings.create({ guild: g }));
  offline.filter(g => !online.includes(g)).forEach(g => client.settings.destroy({ where: { guild: g } }));

  // Set the game as the default help command + guild count.
  client.user.setPresence({game: {name: `How can i help you?`, type:0}});

  // Log that we're ready to serve, so we know the bot accepts commands.
  client.log.info(`${client.user.tag}, ready to serve ${client.users.size - 1} users in ${client.guilds.size} servers.`);
};
