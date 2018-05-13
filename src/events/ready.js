module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes guild information will come in *after* ready.
  await client.wait(2000);

  // Initializes the dashboard.
  require("../modules/dashboard.js")(client);

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
+  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.settings.default));

  // Set the game as the default help command + guild count.
  client.user.setPresence({game: {name: `How can i ${client.settings.default.prefix}help you?`, type:0}});

  // Log that we're ready to serve, so we know the bot accepts commands.
  client.logger.info(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
};
