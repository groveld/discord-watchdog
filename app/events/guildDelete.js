const logger = require('../utils/logger');

module.exports = guild => {
  let client = guild.client;
  let settings = client.settings;
  if (settings[guild.id]) delete settings[guild.id];
  logger.info(`Database removed for ${guild.name}`);
};
