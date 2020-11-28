const { Collection } = require('discord.js');
const logger = require('../utils/logger');
const commandPrefix = process.env.WATCHDOG_PREFIX || '?';

module.exports = (client, message) => {
  if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

  const args = message.content.slice(commandPrefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${commandPrefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (message.mentions.users.array().size >= 25 || message.mentions.members.array().size >= 25) {
    message.member.ban({ reason: 'Auto Moderation: Mentioned more than 25 members in a message.' });
  }

  const cooldowns = new Collection();

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // logger.info(cooldowns);

  try {
    command.execute(message, args);
  }
  catch (err) {
    logger.error(err.message);
    message.reply('there was an error trying to execute that command!');
  }
};
