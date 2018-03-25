const log = require('utils/logger.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

// require('utils/eventLoader')(client);

client.settings = require('/config/settings.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('commands/', (err, files) => {
  if (err) log.error(err);
  log.info(`Loading a total of ${files.length} commands.`);
  files.forEach(file => {
    let cmd = require(`commands/${file}`);
    // log.info(`Loading Command: ${cmd.info.name}.`);
    client.commands.set(cmd.info.name, cmd);
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.info.name);
    });
  });
});

fs.readdir('commands/', (err, files) => {
  if (err) log.error(err);
  log.info(`Loading a total of ${files.length} commands.`);
  files.forEach(file => {
    // if(f.split(".").slice(-1)[0] !== "js") return;
    let props = require(`commands/${file}`);
    client.commands.set(props.help.name, props);
    // if(props.init) props.init(client);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir('events/', (err, files) => {
  if (err) log.error(err);
  log.info(`Loading a total of ${files.length} events.`);
  files.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`events/${file}`)];
  });
});




client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`commands/${command}`)];
      let cmd = require(`commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.info.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let settings = client.settings[message.guild.id];
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modRole);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminRole);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};

// let regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('warn', err => {
//   log.warn(err.replace(regToken, 'that was redacted'));
// });
// client.on('error', err => {
//   log.error(err.replace(regToken, 'that was redacted'));
// });

process.on('unhandledRejection', err => {
  log.error(`Uncaught Promise Error: \n${err.stack}`);
});

client.login(client.settings.token).catch(log.error);
