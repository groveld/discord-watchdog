exports.run = async (client, message, args, level) => {

};

exports.conf = {
  enabled: true,
  aliases: ['setting', 'settings'],
  permLevel: 5
};

exports.help = {
  name: 'set',
  description: 'View or change settings for your server',
  usage: 'set <view/get/edit> <key> <value>'
};
