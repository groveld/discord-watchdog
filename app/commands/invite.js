exports.run = async (client, message) => {
  message.channel.send(`To add ${client.user.username} to your discord guild:\n<https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot&permissions=2146958583>`);
  // await message.delete();
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "invite",
  description: "Displays the join server link of the bot.",
  usage: "invite"
};
