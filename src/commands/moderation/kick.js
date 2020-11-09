module.exports = {
  name: 'kick',
  description: 'Tag a member and kick them (but not really).',
  guildOnly: true,
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }

    const taggedUser = message.mentions.users.first();

    taggedUser.kick('Optional reason that will display in the audit logs')
      .then(() => {
        message.reply(`Successfully kicked ${taggedUser.username}!`);
      }).catch(() => {
        message.reply(`I was unable to kick ${taggedUser.username}. Check if their roles are higher then mine or if they have administrative permissions!`);
      });
  },
};
