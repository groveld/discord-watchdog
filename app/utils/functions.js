module.exports = (client) => {

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
    // if (message.author.id === OWNER) permlvl = 10; // is bot owner
    return permlvl;
  };

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  // client.permlevel = message => {
  //   let permlvl = 0;

  //   const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

  //   while (permOrder.length) {
  //     const currentLevel = permOrder.shift();
  //     if (message.guild && currentLevel.guildOnly) continue;
  //     if (currentLevel.check(message)) {
  //       permlvl = currentLevel.level;
  //       break;
  //     }
  //   }
  //   return permlvl;
  // };

  // /*
  // SINGLE-LINE AWAITMESSAGE

  // A simple way to grab a single reply, from the user that initiated
  // the command. Useful to get "precisions" on certain things...

  // USAGE

  // const response = await client.awaitReply(msg, "Favourite Color?");
  // msg.reply(`Oh, I really love ${response} too!`);

  // */
  // client.awaitReply = async (msg, question, limit = 60000) => {
  //   const filter = m => m.author.id === msg.author.id;
  //   await msg.channel.send(question);
  //   try {
  //     const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
  //     return collected.first().content;
  //   } catch (e) {
  //     return false;
  //   }
  // };


  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 0});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  // client.loadCommand = (commandName) => {
  //   try {
  //     const props = require(`../commands/${commandName}`);
  //     client.logger.log(`Loading Command: ${props.help.name}. 👌`);
  //     if (props.init) {
  //       props.init(client);
  //     }
  //     client.commands.set(props.help.name, props);
  //     props.conf.aliases.forEach(alias => {
  //       client.aliases.set(alias, props.help.name);
  //     });
  //     return false;
  //   } catch (e) {
  //     return `Unable to load command ${commandName}: ${e}`;
  //   }
  // };

  // client.unloadCommand = async (commandName) => {
  //   let command;
  //   if (client.commands.has(commandName)) {
  //     command = client.commands.get(commandName);
  //   } else if (client.aliases.has(commandName)) {
  //     command = client.commands.get(client.aliases.get(commandName));
  //   }
  //   if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

  //   if (command.shutdown) {
  //     await command.shutdown(client);
  //   }
  //   delete require.cache[require.resolve(`../commands/${commandName}.js`)];
  //   return false;
  // };

  // /* MISCELANEOUS NON-CRITICAL FUNCTIONS */

  // // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
  // // later, this conflicts with native code. Also, if some other lib you use does
  // // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
  // // are, we feel, very useful in code.

  // // <String>.toPropercase() returns a proper-cased string such as:
  // // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  // String.prototype.toProperCase = function() {
  //   return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  // };

  // // <Array>.random() returns a single random element from an array
  // // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  // Array.prototype.random = function() {
  //   return this[Math.floor(Math.random() * this.length)]
  // };

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Unhandled rejection: ", err.stack);
    process.exit(1);
  });

};
