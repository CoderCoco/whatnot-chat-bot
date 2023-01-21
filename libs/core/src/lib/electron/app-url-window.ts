import { logger } from "@app/logging";
import { BrowserView, KeyboardInputEvent } from "electron";
import { tick } from "../sleep";
import { KeypressEvent } from "./keypress.event";

// TODO: Document
export class AppUrlWindow {
  private static readonly KEYPRESS_EVENT_ORDER: ReadonlyArray<KeyboardInputEvent['type']> = ["keyDown", "char", "keyUp"];

  public readonly view: BrowserView;

  readonly #readyPromise: Promise<void>

  constructor(url: string, options: Electron.BrowserViewConstructorOptions | undefined = undefined) {
    this.view = new BrowserView(options);

    this.#readyPromise = (async () => {
      logger.debug(`Waiting for window with URL ${url} to be ready`);

      // @ts-ignore
      await this.view.webContents.loadURL(url);

      logger.debug(`Window with URL ${url} is ready`);
    })();
  }

  /**
   * Sends a single keypress to the application.
   * @param keypress The key to press
   */
  public async sendKey(keypress: KeypressEvent){
    for (const type of AppUrlWindow.KEYPRESS_EVENT_ORDER) {
      // If the type is char then we need to skip if not dealing with a
      // single character.
      if (type == "char" && keypress.keyCode.length > 1) continue;

      this.view.webContents.focus();
      this.view.webContents.sendInputEvent({
        ...keypress,
        type: type
      });

      await tick();
    }
  }

  /**
   * Sends a sequence of key presses to the app url window.
   * @param sequence The sequence of key presses to send.
   */
  public async sendSequence(sequence: KeypressEvent[]){
    for (const entry of sequence){
      logger.silly("Sending Key", entry);

      await this.sendKey(entry);
      await tick();
    }
  }

  /**
   * Waits for when the {@link view} is ready to show and then returns.
   */
  public async whenReady(): Promise<void> {
    await this.#readyPromise;
  }
}
