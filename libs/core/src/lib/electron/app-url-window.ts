import { logger } from "@app/logging";
import { BrowserWindow, KeyboardInputEvent } from "electron";
import { tick } from "../sleep";
import { KeypressEvent } from "./keypress.event";

// TODO: Document
export class AppUrlWindow {
  private static readonly READY_TO_SHOW = "ready-to-show";
  private static readonly KEYPRESS_EVENT_ORDER: ReadonlyArray<KeyboardInputEvent['type']> = ["keyDown", "char", "keyUp"];

  public readonly window: BrowserWindow;

  readonly #readyPromise: Promise<void>

  constructor(url: string, options: Electron.BrowserWindowConstructorOptions | undefined = undefined) {
    this.window = new BrowserWindow(options);

    this.window.loadURL(url);

    this.#readyPromise = new Promise((resolve) => {
      logger.debug(`Waiting for window with URL ${url} to be ready`);
      const eventFunction = () => {
        logger.debug(`Window with URL ${url} is ready`);
        this.window.off(AppUrlWindow.READY_TO_SHOW, eventFunction)
        resolve()
      }

      this.window.on(AppUrlWindow.READY_TO_SHOW, eventFunction)
    })
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

      this.window.focus();
      this.window.webContents.sendInputEvent({
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
   * Waits for when the {@link window} is ready to show and then returns.
   */
  public async whenReady(): Promise<void> {
    await this.#readyPromise;
  }
}
