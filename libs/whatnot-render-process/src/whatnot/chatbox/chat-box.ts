import {
  WHATNOT_CHAT_SEND_EVENT,
  WHATNOT_CHAT_SEND_KEYS_EVENT, WhatnotChatSendEventArg
} from "@app/application-events";
import { logger } from "@app/logging";
import { ipcRenderer } from "electron";
import {OnDestroy, tick} from "@app/core";
import {IpcRenderEventListener} from "@app/core";
import { ChatBoxKeypressEvent } from "./chat-box-keypress.event";
import { convertString } from "../convert-string";
import { ChatBoxWatcher } from "./chat-box-watcher";

export class ChatBox implements OnDestroy {
  readonly #sendMessageElement: HTMLInputElement;
  readonly #chatboxWatcher: ChatBoxWatcher;
  readonly #whatnotSendChatEvent = new IpcRenderEventListener(
    WHATNOT_CHAT_SEND_EVENT,
    this.chatMessageListener.bind(this)
  )

  static #getChatboxElement(inputElement: HTMLInputElement): HTMLDivElement {
    const value = inputElement.parentElement?.parentElement?.childNodes[0];

    if (inputElement == null) throw new Error("Unable to locate the chatbox");

    return value as HTMLDivElement;
  }

  constructor() {
    logger.debug("Constructing a new ChatBox");
    const input = document.querySelector(".chatInput");

    if (input == null) {
      throw new Error("Unable to find chatbox message div")
    }

    this.#sendMessageElement = input as HTMLInputElement
    this.#chatboxWatcher = new ChatBoxWatcher(
      ChatBox.#getChatboxElement(this.#sendMessageElement)
    );
  }

  /**
   * Cleans up the event listeners.
   */
  public destroy() {
    logger.debug("Destroying the chatbox");
    this.#whatnotSendChatEvent.destroy();
    this.#chatboxWatcher.destroy();
  }

  private async chatMessageListener(_: Electron.IpcRendererEvent, {message}: WhatnotChatSendEventArg) {
    await this.sendChatMessage(message)
  }

  public async sendChatMessage(message: string) {
    logger.debug("Focusing the chat element");
    this.#sendMessageElement.focus();

    logger.debug("Waiting for focus");
    await tick();

    logger.debug(`Sending "${message}"`);
    await ipcRenderer.invoke(WHATNOT_CHAT_SEND_KEYS_EVENT, this.getKeystrokes(message));
  }

  private getKeystrokes(message: string): ChatBoxKeypressEvent {
    return {
      keys: [...convertString(message), {keyCode: "Return"}]
    }
  }
}
