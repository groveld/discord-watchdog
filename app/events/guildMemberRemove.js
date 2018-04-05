module.exports = async (client, member) => {
  if (member.id === member.client.user.id) return;

  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== true) return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  member.guild.channels.find("name", settings.welcomeChannel).send(`**${member}** just left **${member.guild.name}**. Bye bye! :wave:`).catch(err => client.logger.error(err.message));
};
