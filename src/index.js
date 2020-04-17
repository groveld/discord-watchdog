const log = require('./modules/logger');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.BOT_TOKEN });

manager.on('shardCreate', shard => log.info(`Launched shard ${shard.id}`));

manager.spawn().catch(error => log.error(error.message));