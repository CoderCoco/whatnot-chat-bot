import {IpcMainEventListener} from "@app/core";
import {logger} from "@app/logging";
import { ipcMain } from "electron";
import {
  WHATNOT_WEBSITE_STATUS_UPDATE_EVENT,
  WhatnotWebsiteStatus,
  WhatnotWebsiteStatusUpdateArg
} from "@app/application-events";

export class SiteStatus {
  #statusListener = new IpcMainEventListener(
    WHATNOT_WEBSITE_STATUS_UPDATE_EVENT,
    this.handleWebsiteStatusUpdate.bind(this)
  );

  #status = WhatnotWebsiteStatus.UNKNOWN;

  public get status(): WhatnotWebsiteStatus {
    return this.#status;
  }

  private handleWebsiteStatusUpdate(_: Electron.IpcMainInvokeEvent, {status}: WhatnotWebsiteStatusUpdateArg) {
    logger.debug(`Current website status changed to ${WhatnotWebsiteStatus[status]}`);

    this.#status = status;
  }
}
