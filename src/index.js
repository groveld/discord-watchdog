const log = require('./modules/logger');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN });

manager.spawn().catch(err => {
  log.error(err.message);
});

manager.on('shardCreate', shard => log.info(`Launched shard ${shard.id}`));
