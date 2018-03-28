module.exports = (client, guild) => {
  // Well they're gone. Let's remove them from the settings!
  client.settings.delete(guild.id);
};
