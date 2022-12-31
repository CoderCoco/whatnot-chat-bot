import { logger } from "@app/logging";
import { ipcMain } from "electron";
import { IPCLoggerTransport } from "@app/whatnot-render-process";

type LogProperty = {level: string, message: string}

export function addLoggingHandler() {
  ipcMain.handle(IPCLoggerTransport.LOG_EVENT, (_, {level, message}: LogProperty) => {
    logger.log(level, message, {service: "WhatNot Render Process"});
  });
}