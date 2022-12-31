import { logger } from "@app/logging";
import { ipcRenderer } from "electron";

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
    await new Promise(resolve => setTimeout(resolve, 10));// Uggg make sleep function

    logger.debug("Sending \"hello\"");
    await ipcRenderer.invoke(ChatBox.SEND_KEYS_EVENT, {keys: [{keyCode: "h"}, {keyCode: "e"}, {keyCode: "l"}, {keyCode: "l"}, {keyCode: "o"}]})

    // Try to just send the enter keycode if that works then I don't have to worry about sending the dumb event lol
    // wait for the next time dilla is live

    // this.#chatDomElement.value = message;

    logger.debug("Sending enter");
    this.sendEnter();
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