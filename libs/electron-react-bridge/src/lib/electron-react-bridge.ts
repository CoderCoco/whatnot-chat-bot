import { contextBridge } from 'electron';
import {logger, IPCLoggerTransport, LoggerType} from "@app/logging";

logger.add(new IPCLoggerTransport());

contextBridge.exposeInMainWorld('logger', {
  silly: (...args: any) => (logger as any).silly(...args),
  debug: (...args: any) => (logger as any).debug(...args),
  verbose: (...args: any) => (logger as any).verbose(...args),
  warn: (...args: any) => (logger as any).warn(...args),
  error: (...args: any) => (logger as any).error(...args)
} as LoggerType);
