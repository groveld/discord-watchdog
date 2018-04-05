// Sanitize global variables and set defaults if none provided.
process.env.CONFIG = process.env.CONFIG || "/config";
process.env.TOKEN = process.env.TOKEN || "";
process.env.OWNER = process.env.OWNER || "143720221977477120";

const logger = require("./utils/logger");
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  totalShards: "auto",
  respawn: true,
  shardArgs: [],
  token: process.env.TOKEN
});

manager.on("launch", shard => {
  logger.debug(`Launched shard ${shard.id}`);
});

manager.spawn().catch(err => {
  logger.error(err.message);
});
