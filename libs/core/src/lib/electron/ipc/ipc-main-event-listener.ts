import {logger} from "@app/logging";
import {ipcMain} from "electron";
import * as Electron from "electron";

/**
 * An event listener for the {@link ipcMain} process. Starts listening on
 * construction and stops listening on destroy.
 */
export class IpcMainEventListener {
  /**
   * Construct and start listening for an event.
   *
   * @param event The event to listen for.
   * @param listener The listener to call.
   */
  constructor(
    public readonly event: string,
    private readonly listener: (event: Electron.IpcMainInvokeEvent, ...args: any) => void
  ) {
    logger.silly(`Adding IpcMainEventListener for ${event}`)

    ipcMain.handle(this.event, this.listener);
  }

  /**
   * Removes the listener that was created in the constructor.
   */
  public destroy() {
    logger.silly(`Removing IpcMainEventListener for ${this.event}`)

    ipcMain.off(this.event, this.listener);
  }
}
