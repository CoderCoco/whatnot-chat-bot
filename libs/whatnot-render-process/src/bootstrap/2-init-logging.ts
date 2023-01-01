import { logger } from "@app/logging";
import path = require("path");
import { IPCLoggerTransport } from "../logger/ipc-logger-transport";

logger.add(new IPCLoggerTransport());