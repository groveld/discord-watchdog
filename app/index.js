const log = require('utils/logger.js');
// const { ShardingManager } = require('discord.js');
// const manager = new ShardingManager('bot.js', {
//   totalShards: 1,
//   respawn: true,
//   shardArgs: [],
//   token: null
// });

// manager.on('launch', shard => {
//   log.debug(`Launched Shard ${shard.id}`);
// });

// manager.spawn().catch(err => {
//   log.error(err);
// });

const { TOKEN, CONFIG } = process.env;
log.debug(TOKEN);
log.debug(CONFIG);
