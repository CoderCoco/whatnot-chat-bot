import { BrowserWindow } from "electron";
import { logger } from "@app/logging";

/**
 * A class that integrates entirely with the whatnot website.
 */
class WhatnotWebsite {
  private static readonly BASE_URL = "https://www.whatnot.com";

  // These numbers were calculated by determining the shift in the whatnot css
  private static readonly MIN_WIDTH = 1220;
  private static readonly MIN_HEIGHT = 725;

  #window: BrowserWindow | null = null

  public get window(): BrowserWindow {
    if (!this.#window) throw new Error("Whatnot window is not opened");

    return this.#window;
  }

  public open(): void {
    if (this.#window) throw new Error("Whatnot window is already opened");

    logger.info("Opening a new WhatNot browser window.")

    this.#window = new BrowserWindow({
      width: WhatnotWebsite.MIN_WIDTH,
      height: WhatnotWebsite.MIN_HEIGHT,
      minHeight: WhatnotWebsite.MIN_HEIGHT + 20,
      minWidth: WhatnotWebsite.MIN_WIDTH,
      minimizable: false,
      title: "Dilla 8=====D",
      webPreferences: {
        devTools: true
      }
    });

    this.#window.loadURL(WhatnotWebsite.BASE_URL);

    this.#window.on('ready-to-show', this.logOnReady.bind(this));
  }

  private logOnReady() {
    this.debugLog()
    this.#window?.off('ready-to-show', this.logOnReady)
  }

  public close(): void {
    this.window.close();
    this.#window = null;
  }

  public toString(): String {
    const bounds = this.#window?.getBounds();

    return `BrowserWindow(currentUrl = ${this.#window?.webContents?.getURL()}, width = ${bounds?.width}, height = ${bounds?.height})`
  }

  private debugLog() {
    if (logger.isVerboseEnabled()) {
      logger.verbose(`${this.toString()}`)
    }
  }
}

export const whatnot = new WhatnotWebsite();