import * as yargs from "yargs";
import {getLoggingOptions, LoggingOptionsArgv, LogLevel} from "./logging";
// Future proofing in case we add other types later.
type FullArguments = LoggingOptionsArgv;

export class CliCommandArgs {
  public static async createCliCommand(): Promise<CliCommandArgs> {
    const argv: FullArguments = await yargs(process.argv.slice(2))
      .option(getLoggingOptions())
      .help()
      .argv;

    return new CliCommandArgs(argv);
  }

  public readonly logDirectory: string;
  public readonly logLevel: LogLevel;
  public readonly doesClearOldLogs: boolean;

  constructor(argv: Awaited<FullArguments>) {
    if(argv.logDirectory == null) this.throwError('logDirectory');
    this.logDirectory = argv.logDirectory;

    if(argv.logLevel == null) this.throwError('logLevel');
    this.logLevel = argv.logLevel;

    if(argv.clearOldLogs == null) this.throwError('clearOldLogs');
    this.doesClearOldLogs = argv.clearOldLogs;
  }

  private throwError(key: string): never {
    throw new Error(`Unable to set value of ${key}. It was undefined in the argument list.`);
  }
}
