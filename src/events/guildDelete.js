const log = require('../modules/logger');
const db = require('../modules/database');

module.exports = async (client, guild) => {
  log.info('Event guildDelete triggered.');

  // log.info(guild.id);
  await db.guild.destroy({ where: { guildId: guild.id } }).catch(error => {
    log.error(error);
  });

  log.info(`Guild has left: ${guild.name} (${guild.id}) with ${guild.memberCount} members.`);
};