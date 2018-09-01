module.exports = async (client, member) => {
  // Dont respond to itself.
  if (member.id === member.client.user.id) return;

  // Load the guild's settings.
  const settings = await client.settings.findOne({ where: { guild: member.guild.id } });

  // If msgEnabled is off, don't proceed.
  if (settings.msgEnabled !== true) return;

  // Replace the placeholders in the goodbye message with actual data.
  const msgGoodbye = settings.msgGoodbye.replace("{{user}}", member.user.tag);

  // Send the goodbye message to the goodbye channel.
  member.guild.channels.find("name", settings.msgChannel).send(msgGoodbye).catch(err => client.logger.error(err.message));
};
