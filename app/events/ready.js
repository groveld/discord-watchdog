module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes guild information will come in *after* ready.
  await client.wait(2000);

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.settings.default));

  // // Check whether the "Default" guild settings are loaded in the enmap. If they're not, write them in. This should only happen on first load.
  // if (!this.client.settings.has("default")) {
  //   if (!this.client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
  //   this.client.settings.set("default", this.client.config.defaultSettings);
  // }

  // Set the game as the default help command + guild count.
  client.user.setPresence({game: {name: `${client.settings.default.prefix}help | ${client.guilds.size} Servers`, type:0}});

  // Log that we're ready to serve, so we know the bot accepts commands.
  client.logger.info(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
};
