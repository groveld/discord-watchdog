module.exports = async (client, message) => {
  // This stops if it's not a guild (obviously), and we ignore all bots.
  if(!message.guild || message.author.bot) return;

  const settings = client.settings.get(message.guild.id);
  const command = message.content.split(" ")[0].slice(settings.prefix.length);
  const params = message.content.split(" ").slice(1);
  const perms = client.elevation(message);
  let cmd;

  if(!message.content.startsWith(settings.prefix)) return;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
