exports.run = async (client, message) => {
  message.channel.send(`= STATISTICS =
  • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Uptime     :: duration
  • Users      :: ${client.users.size.toLocaleString()}
  • Servers    :: ${client.guilds.size.toLocaleString()}
  • Channels   :: ${client.channels.size.toLocaleString()}
  • Discord.js :: version
  • Node       :: ${process.version}`, {code: "asciidoc"});
  await message.delete();
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Gives some useful bot statistics.',
  usage: 'stats'
};
