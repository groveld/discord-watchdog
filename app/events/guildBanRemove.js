module.exports = (guild, user) => {
  let logChannel = guild.channels.find('name', 'mod-log');
  if (logChannel) guild.channels.get(logChannel.id).send(`**${user.username}** was just unbanned!`);
};
