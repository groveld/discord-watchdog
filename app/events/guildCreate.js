module.exports = async (client, guild) => {
  // // We need to add this guild to our settings!
  client.settings.set(guild.id, client.settings.default);

  // client.user.setPresence({game: {name: `${client.settings.get("default").prefix}help | ${client.guilds.size} Servers`, type:0}});

  client.logger.info(`New guild has joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
};
