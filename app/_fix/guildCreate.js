var mongoose = require('mongoose');
const logger = require('../utils/logger');
mongoose.connect('mongodb://localhost/watchdog');

module.exports = guild => {
  var guilds = mongoose.model('guild', { name: String });
  var guild = new guilds({ id: '143720653336346624' });
  guild.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('meow');
    }
  });
  // let client = guild.client;
  // client.settings[guild.id] = {prefix: '!', modRole: 'Moderator', adminRole: 'Administrator'};
  // logger.debug(`Database created for ${guild.name}`);
};
