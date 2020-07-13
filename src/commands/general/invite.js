module.exports = {
  name: 'invite',
  description: 'create an invite link',
  execute: (message) => {
    message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot`);
  },
};
