exports.run = (client, message) => {
    message.channel.send('Donations are **MUCH** appreciated and will keep the bot running!\nNo donation options yet...');
};

exports.info = {
  name: 'donate',
  description: 'Show your appreciation for the bot.',
  usage: ''
};

exports.conf = {
  enabled: true,
  aliases: [],
  runIn: ['text'],
  permLevel: 0
};
