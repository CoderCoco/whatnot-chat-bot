import { logger } from "@app/logging";
import {AppBrowserView} from "./app-browser-view";

// TODO: Document
export class AppUrlBrowserView extends AppBrowserView {
  /**
   * Creates a url view.
   * @param url The URL to open on the application.
   * @param options Options to set on the window.
   *
   * @returns A reference to the created object.
   */
  public static async createView(url: string,  options: Electron.BrowserViewConstructorOptions | undefined = undefined): Promise<AppUrlBrowserView> {
    const urlView = new AppUrlBrowserView(options);

    await urlView.loadUrl(url);

    return urlView;
  }

  constructor(options: Electron.BrowserViewConstructorOptions | undefined = undefined) {
    super(options)
  }

  public async loadUrl(url: string): Promise<void> {
    logger.debug(`Waiting for window with URL ${url} to be ready`);

    await this.view.webContents.loadURL(url);

    logger.debug(`Window with URL ${url} is ready`);
  }
}
