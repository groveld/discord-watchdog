const fs = require('fs');
const logger = require('../utils/logger');

exports.run = client => {
  fs.writeFile('./settings.json', JSON.stringify(client.settings, null, 2), 'utf-8', function(err) {
		if (err) throw err
		logger.info('Server config saved to settings.json')
	})
};

exports.info = {
  name: 'save',
  description: 'Test module for testing new functions',
  usage: 'save'
};

exports.conf = {
  enabled: true,
  aliases: [],
  runIn: ['text'],
  permLevel: 0
};
