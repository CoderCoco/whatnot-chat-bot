const tsConfig = require('assets/tsconfig.base.json');
const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
  baseUrl: "./",
  paths: tsConfig.compilerOptions.paths
});

import { logger } from '@app/logging';
import { IPCLoggerTransport } from './logger/ipc-logger-transport';

logger.add(new IPCLoggerTransport());

require("./app/preload")
