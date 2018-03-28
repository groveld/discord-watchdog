const { TOKEN } = process.env;
const log = require('./utils/logger.js');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', {
  totalShards: 'auto',
  respawn: true,
  shardArgs: [],
  token: TOKEN
});

manager.on('launch', shard => {
  log.debug(`Launched shard ${shard.id}`);
});

manager.spawn().catch(err => {
  log.error(err);
});
