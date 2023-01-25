import {WHATNOT_CHAT_RECEIVE_EVENT, WhatnotChatReceiveEventArg} from "@app/application-events";
import {OnDestroy, sleep} from "@app/core";
import { logger } from "@app/logging";
import {Subscription} from "rxjs";
import { DomWatcher } from "../../dom-watcher"
import { ChatBoxMessage } from "./chat-box-message";
import { ipcRenderer } from "electron";

export class ChatBoxWatcher implements OnDestroy {
  private static readonly DEBOUNCE_TIME = 500;

  public static async create(chatboxDiv: HTMLDivElement): Promise<ChatBoxWatcher> {
    logger.debug(`Waiting for ${ChatBoxWatcher.DEBOUNCE_TIME}ms before initializing the ChatBoxWatcher`)
    await sleep(ChatBoxWatcher.DEBOUNCE_TIME);

    logger.debug(`Constructing a ChatBoxWatcher`)
    return new ChatBoxWatcher(chatboxDiv);
  }

  readonly #watcher: DomWatcher;

  #nodeAdded$: Subscription | undefined

  readonly ready: Promise<void>;

  private constructor(chatboxDiv: HTMLDivElement) {
    logger.debug("Constructing a new ChatBoxWatcher");
    this.#watcher = new DomWatcher(chatboxDiv);

    this.ready = this.addWatcher()
  }

  public destroy() {
    logger.silly("Destroying the chatbox watcher");
    this.#nodeAdded$?.unsubscribe()
    this.#watcher.destroy();
  }

  private async addWatcher(): Promise<void> {
    await sleep(ChatBoxWatcher.DEBOUNCE_TIME);

    logger.debug("Adding a watcher to the chatbox.");
    this.#nodeAdded$ = this.#watcher.nodeAdded.subscribe(this.handleAddNode.bind(this));
  }

  private handleAddNode(value: Node) {
    try {
      const chat = new ChatBoxMessage(value);

      logger.info(`Parsed chat message from user {${chat.user}}: [${chat.message}]`)

      void ipcRenderer.invoke(WHATNOT_CHAT_RECEIVE_EVENT, chat);
    } catch (e) {
      logger.error("Unable to process expected chat message", e);
    }
  }
}
