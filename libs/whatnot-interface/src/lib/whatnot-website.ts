import {
  WHATNOT_CHAT_RECEIVE_EVENT,
  WHATNOT_CHAT_SEND_KEYS_EVENT, WhatnotChatReceiveEventArg,
  WhatnotChatSendKeyEventArg,
  WhatnotWebsiteStatus
} from "@app/application-events";
import {AppUrlBrowserView, IpcMainEventListener} from "@app/core";
import {logger} from "@app/logging";
import {mixitup} from "@app/mixitup-interface";
import {BrowserView, ipcMain} from "electron";
import {SiteStatus} from "./site-status";
import path = require("path");

/**
 * A class that integrates entirely with the whatnot website.
 */
export class WhatnotWebsite {
  private static readonly BASE_URL = "https://www.whatnot.com";

  /**
   * Creates a new {@link WhatnotWebsite} view.
   *
   * @returns The whatnot website instantiated object.
   */
  public static async createView(): Promise<WhatnotWebsite> {
    const website = new WhatnotWebsite();
    await website.open();

    return website;
  }

  // These numbers were calculated by determining the shift in the whatnot css
  public static readonly MIN_WIDTH = 1220;
  public static readonly MIN_HEIGHT = 725;
  public readonly siteStatus = new SiteStatus();

  #sendKeysEventHandle: IpcMainEventListener | null = null;
  #receiveMessageEventHandle: IpcMainEventListener | null = null;
  #appUrlWindow: AppUrlBrowserView | null = null

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public get appUrlBrowserView(): AppUrlBrowserView {
    if (!this.#appUrlWindow) throw new Error("Whatnot window is not opened");

    return this.#appUrlWindow;
  }

  public get view(): BrowserView {
    return this.appUrlBrowserView.view;
  }

  public async open(): Promise<void> {
    if (this.#appUrlWindow) throw new Error("Whatnot window is already opened");

    logger.info("Opening a new WhatNot browser window.")

    this.#appUrlWindow = await AppUrlBrowserView.createView(WhatnotWebsite.BASE_URL, {
      webPreferences: {
        devTools: true,
        sandbox: false,
        preload: path.join(__dirname, "../../libs/whatnot-render-process/src/main.js")
      }
    });

    logger.info('Adding chatbox keypress event listener');

    this.#sendKeysEventHandle = new IpcMainEventListener(WHATNOT_CHAT_SEND_KEYS_EVENT, this.handleKeySequenceEvent.bind(this))
    this.#receiveMessageEventHandle = new IpcMainEventListener(WHATNOT_CHAT_RECEIVE_EVENT, this.handleReceivedMessageEvent.bind(this))
  }

  public get isOpen(): boolean {
    return !!this.#appUrlWindow;
  }

  public get isLivestreamReady(): boolean {
    return this.siteStatus.status == WhatnotWebsiteStatus.LIVE_STREAM;
  }

  public close(): void {
    ipcMain.off(WHATNOT_CHAT_SEND_KEYS_EVENT, this.handleKeySequenceEvent);
    this.appUrlBrowserView.view.webContents.close();
    this.#appUrlWindow = null;
    this.#sendKeysEventHandle?.destroy()
    this.#receiveMessageEventHandle?.destroy()

    this.#sendKeysEventHandle = null;
    this.#receiveMessageEventHandle = null;
  }

  public toString(): string {
    const window = this.#appUrlWindow?.view
    const bounds = window?.getBounds();

    return `WhatnotWebsite(currentUrl = ${window?.webContents?.getURL()}, width = ${bounds?.width}, height = ${bounds?.height})`
  }

  private async handleKeySequenceEvent(_: Electron.IpcMainInvokeEvent, {keys}: WhatnotChatSendKeyEventArg) {
    if(logger.isVerboseEnabled()) {
      logger.verbose(`Sending requested key sequence, ${JSON.stringify(keys)}`);
    }

    await this.appUrlBrowserView.sendSequence(keys);
  }

  private async handleReceivedMessageEvent(_: Electron.IpcMainInvokeEvent, chatMessage: WhatnotChatReceiveEventArg) {
    logger.silly("Received chat message over the pipe", { data: chatMessage });

    await mixitup.commands.processChatMessage(chatMessage.message)
  }
}
