exports.run = async (client, message, params) => {
  const user = (message.mentions.users.first() || client.users.get(params[0]) || null);
  const amount = !!user ? parseInt(params[1], 10) : parseInt(params[0], 10);

  // console.log(`Result: "${user}" "${amount}"`); // DEBUG
  if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
  if (!amount) return message.reply('Must specify an amount to delete!');

  await message.delete();

  let messages = await message.channel.fetchMessages({limit: 100});

  if(user) {
    messages = messages.array().filter(msg=>msg.author.id === user.id);
    messages.length = amount;
  } else {
    messages = messages.array();
    messages.length = amount + 1;
  }

  messages.map(async msg => await msg.delete().catch(console.error));
};

exports.conf = {
  enabled: true,
  aliases: ['purge', 'prune', 'clear'],
  permLevel: 2
};

exports.help = {
  name: 'clean',
  description: 'Cleans X amount of messages from a given channel',
  usage: 'clean [@user/id] [number]'
};