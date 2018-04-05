module.exports = async (client, guild) => {
  // // Well they're gone. Let's remove them from the settings!
  client.settings.delete(guild.id);

  client.user.setPresence({game: {name: `${client.settings.get("default").prefix}help | ${client.guilds.size} servers`, type:0}});

  client.logger.info(`New guild has left: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members.`);
};
