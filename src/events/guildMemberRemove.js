const log = require('../modules/logger');

module.exports = (client, member) => {
  log.info('Event guildMemberRemove triggered.');
  log.info(`${member.name} (${member.id})`);
};