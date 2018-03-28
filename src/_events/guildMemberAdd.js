module.exports = member => {
  member.send(`Hey **${member}**! Welcome to **${member.guild.name}**.\n` +
    `You'll find all of our <#188307465765519360> and <#190022880506019841> in their respective channels.\n` +
    `If you have any questions, feel free to ask one of our **moderators**!`);
  member.guild.defaultChannel.send(`**${member}**, Welcome to **${member.guild.name}**. Enjoy your stay! :confetti_ball:`);
};
