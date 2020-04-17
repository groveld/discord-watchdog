/**
 * stats.js
 *
 * Description here.
 */

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stats',
  description: 'Display info about this Guild or a Member.',
  execute(message, args) {
    const member = message.mentions.members.size === 1 ? message.mentions.members.first() : message.guild.members.cache.get(args[0]);
    if(member) {
      const memberEmbed = new MessageEmbed()
        .setAuthor(`${member.user.tag} (${member.id})`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
        .addField('Created On', member.user.createdAt.toLocaleString())
        .addField('Joined On', member.joinedAt.toLocaleString())
        .addField('Kickable', member.kickable)
        .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
        .addField('Presence', member.presence.status);
      message.channel.send(memberEmbed);
    }
    else {
      const { guild } = message;
      const guildEmbed = new MessageEmbed()
        .setAuthor(`${guild.name} (${guild.id})`)
        .setThumbnail(guild.iconURL())
        .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`)
        .addField('Created On', guild.createdAt.toLocaleString())
        .addField('Guild Owner', `${guild.owner.user.tag} (${guild.owner.user.id})`)
        .addField('Total Members', guild.memberCount)
        .addField('Total Real Members', guild.members.cache.filter(m => !m.user.bot).size)
        .addField('Total Bots', guild.members.cache.filter(m => m.user.bot).size)
        .addField('Total Channels', guild.channels.cache.size)
        .addField('Total Text Channels', guild.channels.cache.filter(channel => channel.type === 'text').size)
        .addField('Total Voice Channels', guild.channels.cache.filter(channel => channel.type === 'voice').size);
      message.channel.send(guildEmbed);
    }
  },
};