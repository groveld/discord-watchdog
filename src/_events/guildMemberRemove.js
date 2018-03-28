module.exports = member => {
  if (member.id === member.client.user.id) return;
  member.guild.defaultChannel.send(`**${member}** just left **${member.guild.name}**. Bye bye! :wave:`);
};
