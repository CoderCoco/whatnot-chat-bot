import {logger} from "@app/logging";
import axios from "axios";
import {getUrlForEndpoint} from "./api-formatter";

interface ResponseRow  {
  ID: string;
  Name: string;
  IsEnabled: boolean;
  Category: string
}

export class Commands {
  public readonly ready: Promise<void>
  readonly #commands = new Map<string, string>();

  constructor() {
    this.ready = this.loadCommands();
  }

  private async loadCommands(): Promise<void> {
    const response = await axios.get<ResponseRow[]>(getUrlForEndpoint("/commands"))

    for (const row of response.data) {
      logger.info(`Loaded command ${row.Name} with id ${row.ID}`, row)
      this.#commands.set(row.Name, row.ID);
    }

    logger.debug("Loaded commands")
  }
}
