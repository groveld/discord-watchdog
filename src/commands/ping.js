exports.run = async (client, message) => {
  await message.delete();
  message.channel.send('Ping?')
  .then(msg => {
    msg.edit({embed: {
      color: 3447003,
      description: `**Pong!** Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`
    }});
  });
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'It... like... pings. Then Pongs. And it\'s not Ping Pong.',
  usage: 'ping'
};
