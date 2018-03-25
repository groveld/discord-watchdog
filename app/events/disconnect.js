const logger = require('../utils/logger');

module.exports = event => {
  if (event.code === 1000) {
    logger.info('Disconnected from Discord cleanly');
  } else {
    logger.warn(`Disconnected from Discord with code ${event.code}`);
  }
};
