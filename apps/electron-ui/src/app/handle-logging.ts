import {cliArgs} from "@app/cli";
import {defaultConsoleTransport, IPCLoggerTransport, logger} from "@app/logging";
import { ipcMain } from "electron";
import * as winston from "winston";
import {format} from 'logform';
import * as chalk from "chalk";
import * as fs from 'fs';

type LogProperty = {level: string, message: string}

export async function addLoggingHandler() {
  logger.remove(defaultConsoleTransport);

  if (cliArgs.doesClearOldLogs) {
    await fs.promises.rm(cliArgs.logDirectory, { force: true, recursive: true});
  }

  logger.add(
    new winston.transports.File({
      dirname: cliArgs.logDirectory,
      filename: 'application.log',
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.metadata(),
        format.printf(info => generatePrintfNonColor(info as any))
      )
    })
  );

  logger.add(
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.metadata(),
        format.printf(info => generatePrintfColor(info as any))
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

function getThread(info: LoggingInfo): string {
  return ' [' + (info['metadata'].service || 'main').padEnd(27) + ']'
}

function getLogLevel(info: LoggingInfo): string {
  return info.level.padEnd(7);
}

function generatePrintfNonColor(info: LoggingInfo) {
  let message = `${info.metadata.timestamp} ${getLogLevel(info)}`;
  message += getThread(info);
  return `${message} ${info.message}`;
}

function generatePrintfColor(info: LoggingInfo) {
  const colorizer = winston.format.colorize()

  let message = `${chalk.gray(info.metadata.timestamp)} ${colorizer.colorize(info.level, getLogLevel(info))}`;
  message += chalk.cyan(getThread(info));

  return `${message} ${info.message}`;
}
