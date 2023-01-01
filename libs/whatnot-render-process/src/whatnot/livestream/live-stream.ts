import {OnDestroy} from "@app/core";
import {logger} from "@app/logging";
import {ChatBox} from "@app/whatnot-render-process";

export class LiveStream implements OnDestroy {
  public readonly chatbox = new ChatBox();

  constructor() {
    logger.info("Constructing a livestream view")
  }

  public destroy() {
    logger.debug("Destroying the livestream view");
    this.chatbox.destroy();
  }
}
