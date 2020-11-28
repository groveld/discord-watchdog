const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const getFiles = dir =>
  fs.readdirSync(path.join(__dirname, dir)).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(path.join(__dirname, name)).isDirectory();
    return isDirectory ? [...files, ...getFiles(name)] : [...files, name];
  }, []);

const registerEvents = async (client, dir) => {
  const files = await getFiles(dir).filter(file => file.endsWith('.js'));
  logger.info(`Loading a total of ${files.length} events.`);
  for (const file of files) {
    const event = require(path.join(__dirname, file));
    const eventName = path.basename(file, path.extname(file));
    logger.debug('Loading event:', eventName);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(path.join(__dirname, file))];
  }
};

const registerCommands = async (client, dir) => {
  const files = await getFiles(dir).filter(file => file.endsWith('.js'));
  logger.info(`Loading a total of ${files.length} commands.`);
  for(const file of files) {
    const command = require(path.join(__dirname, file));
    try {
      logger.debug('Loading command:', command.name);
      client.commands.set(command.name, command);
      delete require.cache[require.resolve(path.join(__dirname, file))];
    }
    catch (err) {
      logger.error(err.message);
    }
  }
};

module.exports = {
  registerEvents,
  registerCommands,
};
