const { CONFDIR } = process.env;
const winston = require('winston');
const moment = require('moment');
const chalk = require("chalk");

const colorLevel = level => {
  switch (level) {
    case 'INFO':
      return chalk.cyan(level);
    case 'ERROR':
      return chalk.red(level);
    case 'WARN':
      return chalk.yellow(level);
    case 'DEBUG':
      return chalk.green(level);
  }
};

const formatter = options => {
  const timestamp = options.timestamp;
  const level = options.level.toUpperCase();
  const message = options.message ? options.message : '';
  const meta = options.meta && Object.keys(options.meta).length ? `\n${chalk.cyan('META')}: ` + JSON.stringify(options.meta) : '';

  return `${chalk.gray(`[${timestamp}]`)} [${colorLevel(level)}] ${message} ${meta}`;
};

winston.emitErrs = true;
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${CONFDIR}/discordjs-bot.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      timestamp: true,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      showLevel: true,
      timestamp: moment().format('DD-MM-YYYY HH:mm:ss'),
      formatter
    })
  ],
  exitOnError: false
});

module.exports = logger;
