import { logger } from "@app/logging";
import { DomWatcher } from "../dom-watcher"
import { ChatBoxMessage } from "./chat-box-message";

export class ChatBoxWatcher {
  readonly #watcher: DomWatcher;

  constructor(chatboxDiv: HTMLDivElement) {
    this.#watcher = new DomWatcher(chatboxDiv);
    this.addWatcherMethods();
  }

  private addWatcherMethods() {
    this.#watcher.nodeAdded.subscribe(this.handleAddNode.bind(this))
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