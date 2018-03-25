exports.run = (client, message, args) => {
  const user = message.mentions.users.first();
  const amount = !parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[1]);

  if (!amount) return message.reply('Must specify an amount to delete!');
  if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');

  message.channel.fetchMessages({
    limit: amount,
  }).then((messages) => {
    if (user) {
      const filterBy = user ? user.id : client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
  });
};

exports.info = {
  name: 'clean',
  description: 'Cleans X amount of messages from a given channel.',
  usage: 'clean <number>'
};

exports.conf = {
  enabled: true,
  aliases: ['purge', 'prune', 'clear'],
  runIn: ['text', 'dm', 'group'],
  permLevel: 0
};
