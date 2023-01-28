import {
  WHATNOT_CHAT_SEND_EVENT,
  WHATNOT_CHAT_SEND_KEYS_EVENT, WhatnotChatSendEventArg,
  WhatnotChatSendKeyEventArg
} from "@app/application-events";
import { logger } from "@app/logging";
import { ipcRenderer } from "electron";
import {OnDestroy, sleep, tick} from "@app/core";
import {IpcRenderEventListener} from "@app/core";
import { convertString } from "../convert-string";
import { ChatBoxWatcher } from "./chat-box-watcher";

export class ChatBox implements OnDestroy {
  public static async create(): Promise<ChatBox> {
    logger.debug("Creating the ChatBox")

    const chatboxElement = await ChatBox.waitForInputToAppear()
    const chatboxWatcher = await ChatBoxWatcher.create(
      ChatBox.#getChatboxElement(chatboxElement)
    )

    return new ChatBox(chatboxElement, chatboxWatcher)
  }

  private static async waitForInputToAppear(): Promise<HTMLInputElement> {
    const timeout = 5000;
    const timeBetweenChecks = 10;
    const loopCount = timeout / timeBetweenChecks;

    const chatboxDivSelector = '.chatInput';

    for (let i = 0; i < loopCount; i++) {
      logger.silly(`Looking for the chatbox div: ${chatboxDivSelector}`);
      const element = document.querySelector(chatboxDivSelector) as HTMLInputElement | null;

      if (element == null) {
        logger.silly("Chatbox div doesn't exist yet");
      } else if (element.disabled) {
        logger.silly("Chatbox is still disabled");
      } else {
        return element;
      }

      await sleep(timeBetweenChecks);
    }

    console.error("Unable to locate the chatbox");
    throw new Error("Timeout waiting for the input to appear.")
  }

  static #getChatboxElement(inputElement: HTMLInputElement): HTMLDivElement {
    const value = inputElement.parentElement?.parentElement?.childNodes[0];

    if (inputElement == null) throw new Error("Unable to locate the chatbox");

    return value as HTMLDivElement;
  }

  readonly #whatnotSendChatEvent = new IpcRenderEventListener(
    WHATNOT_CHAT_SEND_EVENT,
    this.chatMessageListener.bind(this)
  )

  private constructor(
    private readonly sendMessageElement: HTMLInputElement,
    private readonly chatboxWatcher: ChatBoxWatcher
  ) {
    logger.debug("Constructing a new ChatBox");
  }

  /**
   * Cleans up the event listeners.
   */
  public destroy() {
    logger.debug("Destroying the chatbox");
    this.#whatnotSendChatEvent.destroy();
    this.chatboxWatcher.destroy();
  }

  private async chatMessageListener(_: Electron.IpcRendererEvent, {message}: WhatnotChatSendEventArg) {
    await this.sendChatMessage(message)
  }

  public async sendChatMessage(message: string) {
    logger.debug("Focusing the chat element");
    this.sendMessageElement.focus();

    logger.debug("Waiting for focus");
    await tick();

    logger.debug(`Sending "${message}"`);
    await ipcRenderer.invoke(WHATNOT_CHAT_SEND_KEYS_EVENT, this.getKeystrokes(message));
  }

  private getKeystrokes(message: string): WhatnotChatSendKeyEventArg {
    return {
      keys: [...convertString(message), {keyCode: "Return"}]
    }
  }
}
