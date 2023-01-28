import * as path from "path";
import {argv, Argv, InferredOptionTypes, Omit} from "yargs";
import {logLevels} from "./index";
import {BooleanOption, StringOption, OptionsType} from "../types";

interface LogLevel extends StringOption {
  choices: typeof logLevels
}

interface LoggingOptions extends OptionsType {
  'log-directory': StringOption,
  'log-level': LogLevel,
  'clear-old-logs': BooleanOption
}

export function getLoggingOptions(): LoggingOptions {
  const subDirectoryLoggingPath = "WhatnotChatbot/logging";

  let defaultPath = ""
  if(process.platform == 'win32') {
    defaultPath = path.join(
      process.env['APPDATA'] || '/',
      subDirectoryLoggingPath
    )
  } else {
    defaultPath = path.join(
      '/tmp',
      subDirectoryLoggingPath
    )
  }

  return {
    'log-directory': {
      alias: 'L',
      demandOption: true,
      description: 'The directory where log files should be stored.',
      default: defaultPath,
      normalize: true,
      type: 'string'
    },
    'log-level': {
      alias: 'l',
      demandOption: true,
      default: 'info',
      description: 'The logging level to use for the application.',
      choices: logLevels,
      type: "string"
    },
    'clear-old-logs': {
      alias: 'c',
      demandOption: true,
      default: false,
      description: 'Clear the old logs before writing any new ones',
      type: 'boolean'
    }
  }
}

export type LoggingOptionsArgv = Argv<Omit<object, keyof LoggingOptions> & InferredOptionTypes<LoggingOptions>>["argv"]
