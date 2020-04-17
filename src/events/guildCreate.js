const log = require('../modules/logger');
const db = require('../modules/database');
// const db = require('../database/sequelize');

module.exports = async (client, guild) => {
  log.info('Event guildCreate triggered.');

  // log.info(guild.id, guild.owner.id);
  await db.guild.create({ guildID: guild.id, ownerID: guild.ownerID, guildName: guild.name }).catch(error => {
    log.error(error);
  });

  log.info(`Guild has joined: ${guild.name} (${guild.id}) with ${guild.memberCount} members.`);
};