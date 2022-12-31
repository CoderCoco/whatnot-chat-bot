import { BrowserWindow } from "electron";

/**
 * A class that integrates entirely with the whatnot website.
 */
class WhatnotWebsite {
  private static readonly BASE_URL = "https://www.whatnot.com";

  #window: BrowserWindow | null = null

  public get window(): BrowserWindow {
    if (!this.#window) throw new Error("Whatnot window is not opened");

    return this.#window;
  }

  public open(): void {
    if (this.#window) throw new Error("Whatnot window is already opened");

    this.#window = new BrowserWindow({
      width: 800,
      height: 600
    });

    this.#window.loadURL(WhatnotWebsite.BASE_URL);
  }

  public close(): void {
    this.window.close();
    this.#window = null;
  }
}

export const whatnot = new WhatnotWebsite();