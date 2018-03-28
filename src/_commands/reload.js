exports.run = async (client, message, params) => {
  await message.delete();
  if (!params[0]) return message.channel.send(`Must provide a command to reload.`).then(msg => {msg.delete(3000)});
};

exports.conf = {
  enabled: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: 'reload',
  description: 'Reloads a command that\'s been modified.',
  usage: 'reload [command]'
};
