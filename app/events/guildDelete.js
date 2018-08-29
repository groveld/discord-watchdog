module.exports = async (client, guild) => {
  // // Well they're gone. Let's remove them from the settings!
  client.settings.delete(guild.id);

  client.logger.info(`Guild has left: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members.`);
};
