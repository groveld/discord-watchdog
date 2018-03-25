const logger = require('../utils/logger');

module.exports = messages => {
  logger.info(`Deleted ${messages.size} message(s)`);
};
