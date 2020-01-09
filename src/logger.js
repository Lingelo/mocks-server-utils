const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const options = {
    transports: [consoleTransport]
};
module.exports = new winston.createLogger(options);