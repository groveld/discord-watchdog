module.exports = async (client, guild) => {
  // // Well they're gone. Let's remove them from the settings!
  await client.settings.destroy({ where: { guild: guild.id } });

  client.logger.info(`Guild has left: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members.`);
};
