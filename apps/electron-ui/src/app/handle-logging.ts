import {IPCLoggerTransport, logger} from "@app/logging";
import { ipcMain } from "electron";

type LogProperty = {level: string, message: string}

export function addLoggingHandler() {
  ipcMain.handle(IPCLoggerTransport.LOG_EVENT, (_, {level, message}: LogProperty) => {
    logger.log(level, message, {service: "Browser View Render Process"});
  });
}
