/**
 * eval.js
 *
 * The EVAL command will execute **ANY** arbitrary javascript code given to it.
 * THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
 * can be used to do **anything** on your machine, from stealing information to
 * purging the hard drive. DO NOT LET ANYONE ELSE USE THIS
 *
 * However it's, like, super ultra useful for troubleshooting and doing stuff
 * you don't want to put in a command.
 */

// const log = require('../modules/logger');

module.exports = {
  name: 'eval',
  description: 'Evaluates arbitrary javascript.',
  usage: '[code]',
  args:true,
  execute(message, args) {
    const code = args.join(' ');
    try {
      const evaled = eval(code);
      // const clean = await client.clean(client, evaled);
      message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    }
    catch (error) {
      message.channel.send(`\`\`\`xl\n${error.message}\n\`\`\``);
    }
  },
};