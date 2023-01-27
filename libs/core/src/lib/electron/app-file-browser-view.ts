import { logger } from "@app/logging";
import {AddOptions, AppBrowserView} from "./app-browser-view";
import {BrowserWindow} from "electron";

/**
 * An application view that opens up a file path.
 */
export class AppFileBrowserView extends AppBrowserView {
  /**
   * Creates a file view.
   * @param file The file to open on the application.
   * @param options Options to set on the window.
   * @param window The window to add the view to.
   * @param sizingOptions The sizing options to use.
   *
   * @returns A reference to the created object.
   */
  public static async createView(
    file: string,
    window: BrowserWindow,
    sizingOptions: AddOptions,
    options: Electron.BrowserViewConstructorOptions | undefined = undefined
  ): Promise<AppFileBrowserView> {
    const fileView = new AppFileBrowserView(options);

    fileView.addToWindow(window, sizingOptions);
    await fileView.loadFile(file);

    return fileView;
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
