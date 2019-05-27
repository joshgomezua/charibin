'use strict';
const winston = require('winston');
let logger = new winston.Logger();

if (process.env.NODE_ENV === 'production') {
  logger = new winston.Logger({
    transports: [
      new (winston.transports.File)({
        level: 'error',
        filename: `${__dirname}/../logs/${new Date().toDateString()}.log`
      })
    ]
  });
} else if(process.env.NODE_ENV === 'staging') {
  logger.add(winston.transports.Console, {
    level: 'warn',
    colorize: true
  });
} else { // development
  logger.add(winston.transports.Console, {
    level: `${process.env.DEBUG ? 'debug' : 'warn'}`,
    colorize: true
  });
}

module.exports = logger;
