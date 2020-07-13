const logger = require('../utils/logger');

module.exports = async (client, guild) => {
  logger.info('Event guildDelete triggered.');
  logger.info(`Guild has left: ${guild.name} (${guild.id}) with ${guild.memberCount} members.`);
};
