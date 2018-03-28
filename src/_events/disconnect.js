const log = require('../utils/logger.js');

module.exports = event => {
  if (event.code === 1000) {
    log.info('Disconnected from Discord cleanly');
  } else {
    log.warn(`Disconnected from Discord with code ${event.code}`);
  }
};
