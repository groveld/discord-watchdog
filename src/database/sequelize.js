const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  // dialectOptions: {
  //   useUTC: true,
  // },
  // timezone: '+02:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

const guild = sequelize.define('Guilds', {
  guildID: { type: Sequelize.STRING(18), unique: true, primaryKey: true },
  ownerID: { type: Sequelize.STRING(18) },
  guildName: { type: Sequelize.STRING },
  cmdPrefix: { type: Sequelize.CHAR(5), defaultValue: '!' },
});

// const guildconfig = sequelize.define('GuildConfig', {
//   guildId: { type: Sequelize.INTEGER, primaryKey: true, unique: true },
//   cmdPrefix: { type: Sequelize.STRING, defaultValue: '!' },
//   // logChannel: { type: Sequelize.STRING, defaultValue: 'logs' },
//   // modRole: { type: Sequelize.STRING, defaultValue: 'Moderator' },
//   // adminRole: { type: Sequelize.STRING, defaultValue: 'Admin' },
//   // msgEnabled: { type: Sequelize.BOOLEAN, defaultValue: true },
//   // msgChannel: { type: Sequelize.STRING, defaultValue: 'general' },
//   // msgWelcome: { type: Sequelize.STRING, defaultValue: '**{{user}}** joined the server. :tada:' },
//   // msgGoodbye: { type: Sequelize.STRING, defaultValue: '**{{user}}** left the server. :sob:' },
// });

// const user = sequelize.define('Users', {
//   firstName: { type: Sequelize.STRING },
//   lastName: { type: Sequelize.STRING },
// });

sequelize.sync({ alter: true });

// exports.user = user;
exports.guild = guild;
