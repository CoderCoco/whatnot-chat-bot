import { BrowserWindow, ipcMain } from "electron";
import { logger } from "@app/logging";
import { ChatBox, ChatBoxKeypressEvent } from "@app/whatnot-render-process";
import path = require("path");
import { AppUrlWindow } from "@app/core";

/**
 * A class that integrates entirely with the whatnot website.
 */
class WhatnotWebsite {
  private static readonly BASE_URL = "https://www.whatnot.com";

  // These numbers were calculated by determining the shift in the whatnot css
  private static readonly MIN_WIDTH = 1220;
  private static readonly MIN_HEIGHT = 725;

  #appUrlWindow: AppUrlWindow | null = null

  public get appUrlWindow(): AppUrlWindow {
    if (!this.#appUrlWindow) throw new Error("Whatnot window is not opened");

    return this.#appUrlWindow;
  }

  public get window(): BrowserWindow {
    return this.appUrlWindow.window;
  }

  public async open(): Promise<void> {
    if (this.#appUrlWindow) throw new Error("Whatnot window is already opened");

    logger.info("Opening a new WhatNot browser window.")

    this.#appUrlWindow = new AppUrlWindow(WhatnotWebsite.BASE_URL, {
      width: WhatnotWebsite.MIN_WIDTH,
      height: WhatnotWebsite.MIN_HEIGHT,
      minHeight: WhatnotWebsite.MIN_HEIGHT + 20,
      minWidth: WhatnotWebsite.MIN_WIDTH,
      minimizable: false,
      title: "Dilla 8=====D",
      webPreferences: {
        devTools: true,
        sandbox: false,
        preload: path.join(__dirname, "../../apps/electron-ui/libs/whatnot-render-process/src/main.js")
      }
    });

    await this.#appUrlWindow.whenReady()

    logger.info('Adding chatbox keypress event listener');
    ipcMain.handle(ChatBox.SEND_KEYS_EVENT, this.handleKeySequenceEvent.bind(this));

    this.debugLog();
  }

  public get isOpen(): boolean {
    return !!this.#appUrlWindow;
  }

  public close(): void {
    ipcMain.off(ChatBox.SEND_KEYS_EVENT, this.handleKeySequenceEvent);
    this.appUrlWindow.window.close();
    this.#appUrlWindow = null;
  }

  public toString(): String {
    const window = this.#appUrlWindow?.window
    const bounds = window?.getBounds();

    return `BrowserWindow(currentUrl = ${window?.webContents?.getURL()}, width = ${bounds?.width}, height = ${bounds?.height})`
  }

  private async handleKeySequenceEvent(_: Electron.IpcMainInvokeEvent, {keys}: ChatBoxKeypressEvent) {
    if(logger.isVerboseEnabled()) {
      logger.verbose(`Sending requested key sequence, ${JSON.stringify(keys)}`);
    }

    await this.appUrlWindow.sendSequence(keys);
  }

  private debugLog() {
    if (logger.isVerboseEnabled()) {
      logger.verbose(`${this.toString()}`)
    }
  }
}

export const whatnot = new WhatnotWebsite();