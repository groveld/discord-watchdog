const moment = require('moment');
const { version } = require('../../package.json');

exports.run = (client, message) => {
  let guilds = client.guilds.size;
  let channels = client.channels.size;
  let users = client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b);
  let uptime = moment.duration(client.uptime, 'ms').humanize();
  let memory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);

  message.channel.send({embed: {
    color: 3447003,
    description: '**Statistics**',
    fields: [{
      name: '❯ Uptime',
      value: uptime,
      inline: true
    },
    {
      name: '❯ Memory usage',
      value: memory + 'MB',
      inline: true
    },
    {
      name: '❯ General Stats',
      value: `Guilds: ${guilds}\nChannels: ${channels}\nUsers: ${users}`,
      inline: true
    },
    {
      name: '❯ Version',
      value: version,
      inline: true
    }]
  }});
};

exports.info = {
  name: 'stats',
  description: 'Displays statistics about the bot.',
  usage: ''
};

exports.conf = {
  enabled: true,
  aliases: ['statistics'],
  runIn: ['text', 'dm', 'group'],
  permLevel: 0
};
