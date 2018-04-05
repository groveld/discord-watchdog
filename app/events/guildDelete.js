module.exports = async (client, guild) => {
  // // Well they're gone. Let's remove them from the settings!
  client.settings.delete(guild.id);

  // this.client.user.setPresence({game: {name: `${this.client.settings.get("default").prefix}help | ${this.client.guilds.size} Servers`, type:0}});

  // // Well they're gone. Let's remove them from the settings!
  // this.client.settings.delete(guild.id);
};
