import { logger } from "@app/logging";
import { ipcRenderer } from "electron";
import { convertString } from "./convert-string";

export class ChatBox {
  public static readonly SEND_KEYS_EVENT = "app:send-keys"
  readonly #chatDomElement: HTMLInputElement;

  constructor() {
    const input = document.querySelector(".chatInput");

    if (input == null) {
      throw new Error("Unable to find chatbox")
    }

    this.#chatDomElement = input as HTMLInputElement
  }

  public async sendChatMessage(message: string) {
    logger.debug("Focusing the chat element");
    this.#chatDomElement.focus();

    logger.debug("Waiting for focus");
    await new Promise(resolve => setTimeout(resolve, 0)); // TODO: Uggg make sleep function

    logger.debug(`Sending \"${message}\"`);
    await ipcRenderer.invoke(ChatBox.SEND_KEYS_EVENT, { keys: [...convertString(message), {keyCode: "Return"}] });
  }

  private sendEnter() {
    this.#chatDomElement
      .dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          keyCode: 13
        })
      )
  }
}