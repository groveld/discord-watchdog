var mongoose = require('mongoose');
const logger = require('../utils/logger');

exports.run = (client, message) => {
  mongoose.connect('mongodb://localhost/watchdog');
  var guildSchema = new mongoose.Schema({
    gid : {type: Number, index: true},
    prefix : String,
    modRole : String,
    adminRole : String
  });
  var guildModel = mongoose.model('guilds', guildSchema, '00000000111111');
  var newGuild = new guildModel({gid:'281762537162', test:'dit is een test'});

  newGuild.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('OK.');
    }
  });
};

exports.info = {
  name: 'pm',
  description: 'Testing private messaging',
  usage: ''
};

exports.conf = {
  enabled: true,
  aliases: [],
  runIn: ['text', 'dm', 'group'],
  permLevel: 0
};
