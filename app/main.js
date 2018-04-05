const { TOKEN } = process.env;
const logger = require("./utils/logger");
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  totalShards: "auto",
  respawn: true,
  shardArgs: [],
  token: TOKEN
});

manager.on("launch", shard => {
  logger.debug(`Launched shard ${shard.id}`);
});

manager.spawn().catch(err => {
  logger.error(err.message);
});
