import {logger, LoggerType} from "@app/logging";
import {contextBridge} from "electron";
import {ipcEvents} from "./main-world-classes";

export function appEntry() {
  contextBridge.exposeInMainWorld('logger', {
    silly: (...args: any) => (logger as any).silly(...args),
    debug: (...args: any) => (logger as any).debug(...args),
    verbose: (...args: any) => (logger as any).verbose(...args),
    warn: (...args: any) => (logger as any).warn(...args),
    error: (...args: any) => (logger as any).error(...args)
  } as LoggerType);

  contextBridge.exposeInMainWorld('events', ipcEvents)
}
