// Sanitize global variables and set defaults if none provided.
// ============================================================
const fs = require("fs");
if (!fs.existsSync("../config")){
  fs.mkdirSync("../config");
}
process.env.BOT_TOKEN = process.env.BOT_TOKEN || "";
process.env.BOT_SECRET = process.env.BOT_SECRET || "";
process.env.BOT_OWNER = process.env.BOT_OWNER || ""; // 143720221977477120
process.env.BOT_SALT = process.env.BOT_SALT || ""; // da39a3ee5e6b4b0d3255bfef95601890afd80709
process.env.BOT_CALLBACK = process.env.BOT_CALLBACK || ""; // https://discord.groveld.com/callback
process.env.BOT_PORT = process.env.BOT_PORT || "5000"; // 5000
// ============================================================

const logger = require("./util/logger");
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  totalShards: "auto",
  respawn: true,
  shardArgs: [],
  token: process.env.BOT_TOKEN
});

manager.on("launch", shard => {
  logger.debug(`Launched shard ${shard.id}`)
})

manager.spawn().catch(err => {
  logger.error(err.message)
})
