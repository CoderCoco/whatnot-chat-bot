import {logger} from "@app/logging";
import * as chalk from "chalk";
import * as path from "path";

const COMPILED_DIST_ROOT = path.join(__dirname, "../../");

export function getFileRelativeToDist(file: string): string {
  logger.silly(`Resolving Path ${chalk.magentaBright(file)} relative to ${chalk.yellowBright(COMPILED_DIST_ROOT)}`, { service: 'getFileRelativeToDist' });
  const filePath = path.join(COMPILED_DIST_ROOT, file);
  logger.debug(`Evaluated path: ${chalk.cyanBright(filePath)}`,{ service: 'getFileRelativeToDist' });

  return filePath
}
