const log = require('utils/logger.js');

module.exports = client => {
  let users = client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b);
  let channels = client.channels.size;
  let servers = client.guilds.size;

  client.user.setStatus('online');
  client.user.setActivity(`${servers} Servers`);
  log.info(`Connected as ${client.user.tag}`);
  log.info(`Serving: ${users} users, ${channels} channels, ${servers} server(s).`);
  log.info('Client ready.');
};
