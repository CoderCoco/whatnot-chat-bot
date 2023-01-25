import * as winston from 'winston';
import { format } from 'logform';
import chalk from "chalk";

export const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.metadata(),
        format.printf(info => generatePrintf(info as any))
      ),
    })
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

interface LoggingInfo {
  metadata: {
    timestamp: string;
    service?: string;
  }
  level: string;
  message: string;
}
function generatePrintf(info: LoggingInfo) {
  let message = `${info.metadata.timestamp} ${info.level}`;
  message += chalk.bgMagentaBright(' [' + (info['metadata'].service || 'main').padEnd(27) + ']');

  return `${message} ${info.message}`;
}
