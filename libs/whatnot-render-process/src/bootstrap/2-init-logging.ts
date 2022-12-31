import { logger } from "@app/logging";
import { IPCLoggerTransport } from "../logger/ipc-logger-transport";

logger.add(new IPCLoggerTransport());