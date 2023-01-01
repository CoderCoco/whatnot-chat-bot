import {logger} from "@app/logging";
import {ipcRenderer} from "electron";
import * as Electron from "electron";

/**
 * An event listener for the {@link ipcRenderer} process. Starts listening on
 * construction and stops listening on destroy.
 */
export class IpcRenderEventListener {
  /**
   * Construct and start listening for an event.
   *
   * @param event The event to listen for.
   * @param listener The listener to call.
   */
  constructor(
    public readonly event: string,
    private readonly listener: (event: Electron.IpcRendererEvent, ...args: any) => void
  ) {
    logger.silly(`Adding IpcRenderEventListener for ${event}`)

    ipcRenderer.on(this.event, this.listener);
  }

  /**
   * Removes the listener that was created in the constructor.
   */
  public destroy() {
    logger.silly(`Removing IpcRenderEventListener for ${this.event}`)

    ipcRenderer.off(this.event, this.listener);
  }
}
