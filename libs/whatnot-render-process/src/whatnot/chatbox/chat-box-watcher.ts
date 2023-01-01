import {OnDestroy} from "@app/core";
import { logger } from "@app/logging";
import {Subscription} from "rxjs";
import { DomWatcher } from "../dom-watcher"
import { ChatBoxMessage } from "./chat-box-message";

export class ChatBoxWatcher implements OnDestroy {
  readonly #watcher: DomWatcher;

  readonly #nodeAdded$: Subscription

  constructor(chatboxDiv: HTMLDivElement) {
    logger.debug("Constructing a new ChatBoxWatcher");
    this.#watcher = new DomWatcher(chatboxDiv);
    this.#nodeAdded$ = this.#watcher.nodeAdded.subscribe(this.handleAddNode.bind(this))
  }

  public destroy() {
    logger.silly("Destroying the chatbox watcher");
    this.#nodeAdded$.unsubscribe()
    this.#watcher.destroy();
  }

  private handleAddNode(value: Node) {
    try {
      const chat = new ChatBoxMessage(value);

      logger.info(`Parsed chat message from user {${chat.user}}: [${chat.message}]`)
    } catch (e) {
      logger.error("Unable to process expected chat message", e);
    }
  }
}
