const log = require('../utils/logger');

module.exports = (client, guild) => {
  // We need to add this guild to our settings!
  client.settings.set(guild.id, client.settings.default);
};
