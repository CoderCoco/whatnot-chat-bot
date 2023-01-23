import {LoggerType} from "@app/logging";

/**
 * Extracts the electron logger out of the window object that was set by the
 * corresponding preload script.
 */
export const logger = (window as any).logger as LoggerType
