import * as winston from 'winston';
import {defaultConsoleTransport} from "./console-transport";

export const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: [defaultConsoleTransport]
});
