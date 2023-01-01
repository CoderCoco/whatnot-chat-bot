import { BrowserWindow, ipcMain } from "electron";
import { logger } from "@app/logging";
import path = require("path");

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

    console.log(__dirname);

    this.#window = new BrowserWindow({
      width: WhatnotWebsite.MIN_WIDTH,
      height: WhatnotWebsite.MIN_HEIGHT,
      minHeight: WhatnotWebsite.MIN_HEIGHT + 20,
      minWidth: WhatnotWebsite.MIN_WIDTH,
      minimizable: false,
      title: "Dilla 8=====D",
      webPreferences: {
        devTools: true,
        sandbox: false,
        preload: path.join(__dirname, "../../libs/whatnot-render-process/src/main.js")
      }
    });

    this.#window.loadURL(WhatnotWebsite.BASE_URL);

    this.#window.on('ready-to-show', this.logOnReady.bind(this));
  }

  private logOnReady() {
    this.debugLog()
    this.#window?.off('ready-to-show', this.logOnReady)
  }

  public async sendKey(entry: any, delay: number){
    const window = this.window;

    ["keyDown", "char", "keyUp"].forEach(async(type) =>{
      if (type == "char" && entry.keyCode.length > 1) return;

      entry.type = type;
      window.focus();
      window.webContents.sendInputEvent(entry);

      // Delay
      await new Promise(resolve => setTimeout(resolve, delay));
    });
}

  public async sendSequence(sequence: any[], delay: number){
    for (const entry of sequence){
      logger.silly("Sending Key", entry);

      await this.sendKey(entry, delay);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  public get isOpen(): boolean {
    return !!this.#window;
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