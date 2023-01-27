import {NAVIGATE_TO_URL_EVENT, NavigateToUrlEventArgs} from "@app/application-events";
import {logger} from "@app/logging";
import {ipcRenderer} from "electron";

export interface IpcEvents {
  /**
   * Sends the go to link event to the parent process for processing.
   * @param link The link to navigate to.
   */
  goToLink(link: string): Promise<void>;
}

export const ipcEvents: IpcEvents = {
  goToLink: async (link: string): Promise<void> => {
    logger.silly(`Sending the link ${link} to the main process`)

    await ipcRenderer.invoke(NAVIGATE_TO_URL_EVENT, {
      url: link
    } as NavigateToUrlEventArgs );

    logger.silly("Event was sent")
  }
}
