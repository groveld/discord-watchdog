module.exports = async (client, member) => {
  // Load the guild's settings.
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user).
  if (settings.welcomeEnabled !== true) return;

  // Replace the placeholders in the welcome message with actual data.
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(err => client.logger.error(err.message));
};
