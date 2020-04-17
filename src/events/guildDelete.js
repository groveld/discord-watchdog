const log = require('../modules/logger');
const db = require('../database/db');

module.exports = async (client, guild) => {
  log.info('Event guildDelete triggered.');

  await db.guild.destroy({ where: { guildId: guild.id } }).catch(error => {
    log.error(error);
  });

  log.info(`Guild has left: ${guild.name} (${guild.id}) with ${guild.memberCount} members.`);
};