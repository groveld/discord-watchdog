const logger = require('../utils/logger');

module.exports = async (client, guild) => {
  logger.info('Event guildCreate triggered.');
  logger.info(`Guild has joined: ${guild.name} (${guild.id}) with ${guild.memberCount} members.`);
};
