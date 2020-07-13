const logger = require('../utils/logger');

module.exports = (client, member) => {
  logger.info('Event guildMemberRemove triggered.');
  logger.info(`${member.name} (${member.id})`);
};
