export const logLevels = ['silly', 'debug', 'verbose', 'http', 'info', 'warn', 'error'] as const;

export type LogLevel = typeof logLevels[number]
