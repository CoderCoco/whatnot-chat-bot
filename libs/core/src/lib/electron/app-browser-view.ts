import {logger} from "@app/logging";
import { KeypressEvent } from "./keypress.event";
import { tick } from "../sleep";
import {AutoResizeOptions, BrowserView, BrowserWindow, KeyboardInputEvent, Rectangle} from "electron";

/**
 * The options that are used to add a view to a window.
 */
export interface AddOptions {
  bounds?: Rectangle,
  resizeOptions?: AutoResizeOptions
}

/**
 * An application browser view class.
 */
export class AppBrowserView {
  private static readonly KEYPRESS_EVENT_ORDER: ReadonlyArray<KeyboardInputEvent['type']> = ["keyDown", "char", "keyUp"];

  /**
   * A reference to the browser view object
   */
  public readonly view: BrowserView;

  constructor(options: Electron.BrowserViewConstructorOptions | undefined = undefined) {
    this.view = new BrowserView(options);
  }

  /**
   * Adds the current view to the specified browser view.
   * @param appWindow The app window to add the {@link view} to.
   * @param options Options to set on the view.
   */
  public addToWindow(
    appWindow: BrowserWindow,
    options: AddOptions
  ) {
    if (logger.isSillyEnabled()) {
      logger.silly(`Adding ${this.toString()} to window.`);
    }

    appWindow.addBrowserView(this.view)

    if (options.bounds) {
      logger.silly(`Setting bounds ${JSON.stringify(options.bounds)}`)
      this.view.setBounds(options.bounds);
    }
    if (options.resizeOptions) {
      logger.silly(`Setting resizeOptions ${JSON.stringify(options.resizeOptions)}`);
      this.view.setAutoResize(options.resizeOptions);
    }

    if (logger.isSillyEnabled()) {
      logger.silly(`Added ${this.toString()}`);
    }
  }

  /**
   * Sends a single keypress to the application.
   * @param keypress The key to press
   */
  public async sendKey(keypress: KeypressEvent){
    for (const type of AppBrowserView.KEYPRESS_EVENT_ORDER) {
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

  public toString(): string {
    const bounds = this.view.getBounds();

    return `AppBrowserView(url = ${this.view.webContents.getURL()}, x = ${bounds?.x}, y = ${bounds?.y}, width = ${bounds?.width}, height = ${bounds?.height}))`
  }
}
