const logger = require('./utils/logger');
const Dashboard = require('./dashboard');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.DISCORD_BOT_TOKEN });

manager.on('shardCreate', shard => logger.info(`Launched shard ${shard.id}`));

manager.spawn().catch(error => logger.error(error.message));

Dashboard;
