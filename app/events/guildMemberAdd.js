module.exports = async (client, member) => {
  // Dont respond to itself.
  if (member.id === member.client.user.id) return;

  // Load the guild's settings.
  const settings = await client.settings.findOne({ where: { guild: member.guild.id } });

  // If msgEnabled is off, don't proceed (don't welcome the user).
  if (settings.msgEnabled !== true) return;

  // Replace the placeholders in the welcome message with actual data.
  const msgWelcome = settings.msgWelcome.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel.
  member.guild.channels.find("name", settings.msgChannel).send(msgWelcome).catch(err => client.logger.error(err.message));
};
