const log = require('./modules/logger');
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', {
  totalShards: 'auto',
  respawn: true,
  shardArgs: [],
  token: process.env.BOT_TOKEN
});

manager.on('launch', shard => {
  log.debug(`Launched shard ${shard.id} [${shard.id + 1}/${manager.totalShards}]`)
})

manager.spawn().catch(err => {
  log.error(err.message)
})
