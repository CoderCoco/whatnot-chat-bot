import {logger} from "@app/logging";
import * as chalk from "chalk";
import {cliArgs} from "./cli";

const separatorString = "".padEnd(100, "-");

function logMessage(argument: string, value: string): void {
  logger.info(`   ${chalk.yellowBright(`--${argument}`.padEnd(20))} = ${chalk.greenBright(value)}`);
}

/**
 * A function that will log all the CLI arguments. Should be called by the
 * application upon startup for debugging purposes.
 */
export function logCliArguments(): void {
  logger.info("Application started with arguments")
  logger.info(separatorString);
  logMessage('clear-old-logs', cliArgs.doesClearOldLogs.toString());
  logMessage('log-directory', cliArgs.logDirectory);
  logMessage('log-level', cliArgs.logLevel);
  logger.info(separatorString);
}
