const { createLogger, format, transports } = require('winston');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(__dirname + '/../mocks-server.properties');

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