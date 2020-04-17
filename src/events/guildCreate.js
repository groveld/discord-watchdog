const log = require('../modules/logger');
const db = require('../database/db');

module.exports = async (client, guild) => {
  log.info('Event guildCreate triggered.');

  await db.guild.create({ guildID: guild.id, ownerID: guild.ownerID, guildName: guild.name }).catch(error => {
    log.error(error);
  });

  log.info(`Guild has joined: ${guild.name} (${guild.id}) with ${guild.memberCount} members.`);
};