# discordjs-bot

A General Purpose Node.js Discord Bot.

[Discord Server](https://discord.gg/2dV4xRN)

## Commands

- [ ] `!iam overwatch` if exists add overwatch role (case insensitive)
- [ ] `!iamnot overwatch` if exists remove overwatch role (case insensitive)
- [ ] `!whois overwatch` See who have the overwatch role
- [ ] `!stats` server stats
- [ ] `!stats user` Specific user stats
- [ ] `!level` get user level
- [ ] `!info` general information about the bot
- [ ] `!cat` bot posts a random cat picture
- [ ] `!dog` bot posts a random dog picture

## Installation

**Node 7.0.0 or newer is required.**

When running a bot using discordjs-bot, make sure to run Node with the `--harmony` flag. Examples:

- `node --harmony ./app.js`
- `pm2 start --name "discordjs-bot" --node-args="--harmony" ./sharder.js`

No version of Node older than 7.0.0 supports `async`/`await`, although you can compile it down to ES6 or ES5 with the [fast-async](https://www.npmjs.com/package/fast-async) Babel plugin. You must do this for your code and the framework's manually if you wish to use discordjs-bot on older Node versions.
