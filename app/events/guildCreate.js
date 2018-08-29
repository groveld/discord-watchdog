module.exports = async (client, guild) => {
  // We need to add this guild to our settings!
  client.settings.set(guild.id, client.settings.default);

  client.logger.info(`Guild has joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members.`);
};
