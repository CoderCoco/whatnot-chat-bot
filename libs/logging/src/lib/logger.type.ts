import * as winston from "winston";

export type LoggerType = Pick<winston.Logger, "debug" | "info" | "silly" | "error" | "warn" | "verbose">;
