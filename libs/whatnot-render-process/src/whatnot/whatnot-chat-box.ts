import { logger } from "@app/logging";
import { ipcRenderer } from "electron";
import { tick } from "@app/core";
import { ChatBoxKeypressEvent } from "./chatbox-keypress..event";
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
    await tick();

    logger.debug(`Sending \"${message}\"`);
    await ipcRenderer.invoke(ChatBox.SEND_KEYS_EVENT, this.getKeystrokes(message));
  }

  private getKeystrokes(message: string): ChatBoxKeypressEvent {
    return {
      keys: [...convertString(message), {keyCode: "Return"}]
    }
  }

  // private sendEnter() {
  //   this.#chatDomElement
  //     .dispatchEvent(
  //       new KeyboardEvent("keydown", {
  //         bubbles: true,
  //         cancelable: true,
  //         keyCode: 13
  //       })
  //     )
  // }
}