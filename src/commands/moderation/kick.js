module.exports = {
  name: 'kick',
  description: 'Tag a member and kick them (but not really).',
  guildOnly: true,
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }

    const user = message.mentions.users.first();
    const member = message.guild.member(user);

    member
      .kick('Optional reason that will display in the audit logs')
      .then(() => {
        // We let the message author know we were able to kick the person
        message.reply(`Successfully kicked ${user.username}`);
      })
      .catch(err => {
        // An error happened
        // This is generally due to the bot not being able to kick the member,
        // either due to missing permissions or role hierarchy
        message.reply(`I was unable to kick ${user.username}. Check if their roles are higher then mine or if they have administrative permissions!`);
        // Log the error
        console.error(err);
      });
  },
};
