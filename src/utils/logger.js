const { createLogger, format, transports } = require('winston');
const properties = require('./properties');

module.exports = createLogger({
    level: properties.get('log-level').toLowerCase(),
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console()]
});