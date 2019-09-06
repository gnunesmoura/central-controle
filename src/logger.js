const winston = require('winston');
const nconf = require('nconf');

const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'central-controle' },
  transports: [
    new transports.File({ filename: './log/quick-start-error.log', level: 'error' }),
    new transports.File({ filename: './log/quick-start-combined.log' }),
  ],
});

if (nconf.get('NODE_ENV') !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

module.exports = logger;
