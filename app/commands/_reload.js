exports.run = async (client, message, args) => {
  // if (!args[0]) return message.channel.send(`Must provide a command to reload.`).then(msg => {msg.delete(3000)});
  
  // await message.delete();
};

exports.conf = {
  enabled: false,
  aliases: [],
  permLevel: 10 // Bot Owner
};

exports.help = {
  name: "reload",
  description: "Reloads a command that's been modified.",
  usage: "reload <command>"
};
