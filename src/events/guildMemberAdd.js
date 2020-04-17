const log = require('../modules/logger');

module.exports = (client, member) => {
  log.info('Event guildMemberAdd triggered.');
  log.info(`${member.name} (${member.id})`);
};