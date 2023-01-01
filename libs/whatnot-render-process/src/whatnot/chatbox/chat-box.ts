import { logger } from "@app/logging";
import { ipcRenderer } from "electron";
import { tick } from "@app/core";
import { ChatBoxKeypressEvent } from "./chat-box-keypress.event";
import { convertString } from "../convert-string";
import { ChatBoxWatcher } from "./chat-box-watcher";

export class ChatBox {
  public static readonly SEND_KEYS_EVENT = "app:send-keys"
  readonly #sendMessageElement: HTMLInputElement;
  readonly #chatboxWatcher: ChatBoxWatcher;

  static #getChatboxElement(inputElement: HTMLInputElement): HTMLDivElement {
    const value = inputElement.parentElement?.parentElement?.childNodes[0];

    if (inputElement == null) throw new Error("Unable to locate the chatbox");

    return value as HTMLDivElement;
  }

  constructor() {
    const input = document.querySelector(".chatInput");

    if (input == null) {
      throw new Error("Unable to find chatbox message div")
    }

    this.#sendMessageElement = input as HTMLInputElement
    this.#chatboxWatcher = new ChatBoxWatcher(
      ChatBox.#getChatboxElement(this.#sendMessageElement)
    );
  }

  public async sendChatMessage(message: string) {
    logger.debug("Focusing the chat element");
    this.#sendMessageElement.focus();

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
}