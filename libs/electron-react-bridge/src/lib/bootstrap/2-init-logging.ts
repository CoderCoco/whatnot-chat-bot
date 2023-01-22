import { logger, IPCLoggerTransport } from "@app/logging";

logger.add(new IPCLoggerTransport());
