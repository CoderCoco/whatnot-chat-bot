import * as winston from "winston";

export const defaultConsoleTransport = new winston.transports.Console({
  format: winston.format.simple(),
})
