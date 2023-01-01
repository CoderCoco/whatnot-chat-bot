import {logger} from "@app/logging";
import axios from "axios";
import {getUrlForEndpoint} from "./api-formatter";

export class Command {
  readonly #commandUrl: string;

  constructor(id: string) {
    this.#commandUrl = getUrlForEndpoint(`/commands/${id}`)
  }

  public async sendCommand(): Promise<void> {
    logger.verbose(`Sending command to ${this.#commandUrl}`)

    await axios.post(this.#commandUrl)
  }
}
