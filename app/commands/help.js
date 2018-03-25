exports.run = (client, message, args) => {
  message.delete();
  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Command List =\n\n[Use help <commandname> for details]\n\n${client.commands.map(cmd => `${cmd.info.name}${' '.repeat(longest - cmd.info.name.length)} :: ${cmd.info.description}`).join('\n')}`, {code: 'asciidoc'});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
      message.channel.send(`= ${cmd.info.name} = \n${cmd.info.description}\nusage: ${cmd.info.usage}`, {code: 'asciidoc'});
    }
  }
};

exports.info = {
  name: 'help',
  description: 'Displays all available commands.',
  usage: 'help <command>'
};

exports.conf = {
  enabled: true,
  aliases: ['h', 'halp'],
  runIn: ['text', 'dm', 'group'],
  permLevel: 0
};
