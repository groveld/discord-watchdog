module.exports = async (client, guild) => {
  // We need to add this guild to our settings!
  await client.settings.create({ guild: guild.id });

  client.logger.info(`Guild has joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members.`);
};
