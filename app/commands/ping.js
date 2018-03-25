exports.run = (client, message) => {
  message.channel.send('Ping?')
  .then(msg => {
    msg.edit({embed: {
      color: 3447003,
      description: `**Pong!** Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`
    }});
  });
};

exports.info = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};

exports.conf = {
  enabled: true,
  aliases: [],
  runIn: ['text', 'dm', 'group'],
  permLevel: 0
};
