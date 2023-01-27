import {OnDestroy} from "@app/core";
import {logger} from "@app/logging";
import {ChatBox} from "@app/whatnot-render-process";

export class LiveStream implements OnDestroy {
  /**
   * Creates a {@link LiveStream} object and waits for it to be ready to load.
   *
   * @returns A live stream object.
   */
  public static async create(): Promise<LiveStream> {
    logger.debug("Creating a LiveStream view")
    const chatbox = await ChatBox.create();
    await chatbox.sendChatMessage("The bot has been connected!");

    return new LiveStream(chatbox);
  }

  private constructor(public readonly chatbox: ChatBox) {
    logger.info("Constructing a livestream view")
  }

  public destroy() {
    logger.debug("Destroying the livestream view");
    this.chatbox.destroy();
  }
}
