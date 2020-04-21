import winston from 'winston';
import { properties } from './properties';

export const logger = winston.createLogger({
    level: properties.get('log-level').toLowerCase(),
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()]
});
