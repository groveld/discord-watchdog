// Sanitize global variables and set defaults if none provided.
process.env.bot_config = process.env.bot_config || "/config";
process.env.bot_owner = process.env.bot_owner || "143720221977477120";
process.env.bot_token = process.env.bot_token || "";
process.env.bot_secret = process.env.bot_secret || "";
process.env.bot_salt = process.env.bot_salt || "";
process.env.bot_port = process.env.bot_port || "5000";
process.env.bot_callback = process.env.bot_callback || "";

const logger = require("./util/logger");
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  totalShards: "auto",
  respawn: true,
  shardArgs: [],
  token: process.env.bot_token
});

manager.on("launch", shard => {
  logger.debug(`Launched shard ${shard.id}`)
})

manager.spawn().catch(err => {
  logger.error(err.message)
})
