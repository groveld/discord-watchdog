exports.run = async (client, message, args) => {
  // Load the guild's settings.
  const settings = client.settings.get(message.guild.id);

  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}`).join("\n")}`, {code:"asciidoc"});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage :: ${settings.prefix}${command.help.usage}`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  aliases: ["h"],
  permLevel: 0 // Anyone
};

exports.help = {
  name: "help",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
