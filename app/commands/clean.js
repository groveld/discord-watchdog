exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  const amount = Math.min((!!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])), 100);

  if (!amount && !user) return message.reply("Must specify a user and amount, or just an amount, of messages to purge!");
  if (!amount) return message.reply("Must specify an amount to delete!");

  await message.delete();

  message.channel.fetchMessages({limit: 100}).then(messages => {
    if (user) {
      messages = messages.filter(msg => msg.author.id === user.id).array().slice(0, amount);
    } else {
      messages = messages.array().slice(0, amount);
    }
    message.channel.bulkDelete(messages).catch(err => client.log.error(err.stack));
   });
};

exports.conf = {
  enabled: true,
  aliases: ["purge", "prune", "clear", "rm"],
  permLevel: 3 // Moderator
};

exports.help = {
  name: "clean",
  description: "Cleans X amount of messages from a given channel",
  usage: "clean [user] <number>"
};
