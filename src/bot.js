const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");

// Aliases and commands are put in collections where they can be read from.
client.logger = require("./util/logger");
client.settings = new Enmap();
client.commands = new Enmap();
client.aliases = new Enmap();

client.settings.default = {
  prefix: "!",
  logChannel: "log",
  modRole: "moderators",
  adminRole: "staff",
  msgEnabled: true,
  msgChannel: "general",
  msgWelcome: "**{{user}}** joined the server. :tada:",
  msgGoodbye: "**{{user}}** left the server. :sob:"
}

require("./modules/functions")(client);

const init = async () => {

  // Load commands as a collection, so they're accessible here and everywhere else.
  fs.readdir("./commands/", (err, files) => {
    if (err) client.logger.error(err);
    client.logger.info(`Loading a total of ${files.length} commands.`);
    files.forEach(file => {
      if(file.split(".").slice(-1)[0] !== "js") return;
      let props = require(`./commands/${file}`);
      client.logger.debug("Loading command:", props.help.name);
      client.commands.set(props.help.name, props);
      if(props.init) props.init(client);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });

  // Then we load events, which will include our message and ready event.
  fs.readdir("./events/", (err, files) => {
    if (err) client.logger.error(err);
    client.logger.info(`Loading a total of ${files.length} events.`);
    files.forEach(file => {
      if(file.split(".").slice(-1)[0] !== "js") return;
      const eventName = file.split(".")[0];
      const event = require(`./events/${file}`);
      client.logger.debug("Loading event:", eventName);
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

  client.login(process.env.bot_token).catch(err => client.logger.error(err.message));
};

init();
