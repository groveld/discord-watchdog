exports.run = (client, message) => {
  message.channel.send(`To add ${client.user.username} to your discord guild:\nhttps://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot`);
};

exports.info = {
  name: 'invite',
  description: 'Displays the join server link of the bot.',
  usage: ''
};

exports.conf = {
  enabled: true,
  aliases: [],
  runIn: ['text'],
  permLevel: 0
};
