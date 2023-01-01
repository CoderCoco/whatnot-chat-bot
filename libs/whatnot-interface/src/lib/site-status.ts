import { ipcMain } from "electron";
import {WHATNOT_WEBSITE_STATUS_UPDATE_EVENT, WhatnotWebsiteStatusUpdateArg} from "@app/application-events";

export class SiteStatus {
  constructor() {
    ipcMain.on(WHATNOT_WEBSITE_STATUS_UPDATE_EVENT, this.handleWebsiteStatusUpdate.bind(this))
  }

  private handleWebsiteStatusUpdate(_: Electron.IpcMainInvokeEvent, {data}: WhatnotWebsiteStatusUpdateArg) {
    console.log(data);
  }
}
