import { TransformableInfo } from "logform";
import winston = require("winston");
import { properties } from "./properties";

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.printf((info: TransformableInfo) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
    level: properties.get("log-level").toLowerCase(),
    transports: [new winston.transports.Console()],
});
