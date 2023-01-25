import {IPCLoggerTransport, logger} from "@app/logging";
import chalk from "chalk";
import { ipcMain } from "electron";
import * as path from "path";
import * as process from "process";
import * as winston from "winston";
import {format} from 'logform';

type LogProperty = {level: string, message: string}

export function addLoggingHandler() {
  const loggingHome = process.env['APPDATA'];

  logger.add(
    new winston.transports.File({
      dirname: path.join(loggingHome, "WhatnotChatbot/logging"),
      filename: 'application.log',
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.metadata(),
        format.printf(info => generatePrintf(info as any))
      )
    })
  );

  ipcMain.handle(IPCLoggerTransport.LOG_EVENT, (_, {level, message}: LogProperty) => {
    logger.log(level, message, {service: "Browser View Render Process"});
  });
}

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
  message += ' [' + (info['metadata'].service || 'main').padEnd(27) + ']';

  return `${message} ${info.message}`;
}
