import { logger } from "@app/logging";
import { AppBrowserView } from "./app-browser-view";

/**
 * An application view that opens up a file path.
 */
export class AppFileBrowserView extends AppBrowserView {
  /**
   * Creates a file view.
   * @param file The file to open on the application.
   * @param options Options to set on the window.
   *
   * @returns A reference to the created object.
   */
  public static async createView(file: string,  options: Electron.BrowserViewConstructorOptions | undefined = undefined): Promise<AppFileBrowserView> {
    const urlView = new AppFileBrowserView(options);

    await urlView.loadFile(file);

    return urlView;
  }

  private constructor(options: Electron.BrowserViewConstructorOptions | undefined = undefined) {
    super(options)
  }

  /**
   * Loads a file using the file string.
   * @param file The file string to use.
   */
  public async loadFile(file: string): Promise<void> {
    logger.debug(`Waiting for window with file ${file} to be ready`);

    await this.view.webContents.loadFile(file);

    logger.debug(`Window with file ${file} is ready`);
  }
}
