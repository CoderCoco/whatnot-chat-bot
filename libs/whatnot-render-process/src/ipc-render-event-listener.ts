import {ipcRenderer} from "electron";
import * as Electron from "electron";

export class IpcRenderEventListener {
  constructor(
    public readonly event: string,
    private readonly listener: (event: Electron.IpcRendererEvent, ...args: any) => void
  ) {
    ipcRenderer.on(this.event, this.listener);
  }

  public destroy() {
    ipcRenderer.off(this.event, this.listener);
  }
}
