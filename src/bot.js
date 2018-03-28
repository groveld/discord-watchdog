const { CONFDIR, TOKEN, OWNER } = process.env;
const log = require('./utils/logger.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require("enmap");
const Provider = require("enmap-sqlite");

// Aliases and commands are put in collections where they can be read from.
client.settings = new Enmap({provider: new Provider({name: 'settings', dataDir: CONFDIR})});
// client.settings = new Enmap();
client.commands = new Enmap();
client.aliases = new Enmap();

// Just setting up a default configuration object here, to have something to insert.
client.settings.default = {
  prefix: "!",
  logChannel: "log",
  modRole: "moderator",
  adminRole: "administrator",
  welcomeChannel: "general",
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"
}

// Load commands as a collection, so they're accessible here and everywhere else.
fs.readdir('./commands/', (err, files) => {
  if (err) log.error(err);
  log.info(`Loading a total of ${files.length} command(s)`);
  files.forEach(file => {
    if(file.split(".").slice(-1)[0] !== "js") return;
    let props = require(`./commands/${file}`);
    log.debug(`Loading command: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    if(props.init) props.init(client);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

// Then we load events, which will include our message and ready event.
fs.readdir('./events/', (err, files) => {
  if (err) log.error(err);
  log.info(`Loading a total of ${files.length} event(s)`);
  files.forEach(file => {
    if(file.split(".").slice(-1)[0] !== "js") return;
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    log.debug(`Loading event: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// This function should resolve to an ELEVATION level which
// is then sent to the command handler for verification.
client.elevation = message => {
  let permlvl = 0;
  const settings = client.settings.get(message.guild.id);
  const modRole = message.guild.roles.find('name', settings.modRole);
  const adminRole = message.guild.roles.find('name', settings.adminRole);
  if (modRole && message.member.roles.has(modRole.id)) permlvl = 2; // has moderator role
  if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3; // has administrator role
  if (message.author.id === message.guild.owner.id) permlvl = 5; // is server owner
  if (message.author.id === OWNER) permlvl = 10; // is bot owner
  return permlvl;
};

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.error("Uncaught Exception: ", errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

client.login(TOKEN).catch(log.error);
