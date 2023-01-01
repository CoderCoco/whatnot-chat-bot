import {logger} from "@app/logging";
import axios from "axios";
import {getUrlForEndpoint} from "./api-formatter";
import {Command} from "./command";

interface ResponseRow  {
  ID: string;
  Name: string;
  IsEnabled: boolean;
  Category: string
}

export class Commands {
  public readonly ready: Promise<void>
  readonly #commands = new Map<string, Command>();

  constructor() {
    this.ready = this.loadCommands();
  }

  private async loadCommands(): Promise<void> {
    const response = await axios.get<ResponseRow[]>(getUrlForEndpoint("/commands"))

    for (const row of response.data) {
      logger.info(`Loaded command ${row.Name} with id ${row.ID}`, row)
      this.#commands.set(`!${row.Name}`, new Command(row.ID));
    }

    logger.debug("Loaded commands")
  }

  public async processChatMessage(message: string): Promise<void> {
    await this.ready

    if (message.startsWith("!")) {
      const match = message.match(/^!\S*/);

      if (match != null) {
        await this.attemptSendCommand(match[0]);
      }
    }
  }

  private async attemptSendCommand(command: string): Promise<void> {
    logger.debug(`Attempting to send command ${command}`)

    const commandObj = this.#commands.get(command);

    if (commandObj) {
      logger.info(`Sending command ${command} to mixitup`);
      await commandObj.sendCommand()
    }
  }
}
