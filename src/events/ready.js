const logger = require('../utils/logger');

module.exports = async (client) => {
  // Why await here? Because the ready event isn't actually ready.
  // Sometimes guild information will come in *after* ready.
  await new Promise(r => setTimeout(r, 2000));

  // Set bot presece
  client.user.setPresence({
    // activity: {
    //   type: 'WATCHING',
    //   name: 'all of you!',
    // },
    status: 'online',
  });

  // Log that we're ready to serve, so we know the bot accepts commands.
  logger.info(`${client.user.tag}, ready to serve.`);
};
