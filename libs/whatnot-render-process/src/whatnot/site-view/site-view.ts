import {
  WHATNOT_WEBSITE_STATUS_UPDATE_EVENT,
  WhatnotWebsiteStatus
} from "@app/application-events";
import {OnDestroy, sleep} from "@app/core";
import {logger} from "@app/logging";
import {ipcRenderer} from "electron";
import {LiveStream} from "../livestream/live-stream";
import {SiteWatcher} from "./site-watcher";

export class SiteView {
  readonly #siteWatcher = new SiteWatcher();

  constructor() {
    logger.debug("Constructing a SiteView")

    this.#siteWatcher.urlChanged.subscribe(this.handleUrlChange.bind(this));
  }

  // The current site view must always have a destroy method. So cleanup can
  // be performed based on the views.
  #currentSiteView: OnDestroy | null = null

  private async handleUrlChange(newLocation: Location) {
    if (newLocation.pathname.startsWith("/live")) {
      await this.handleNewLiveStreamView();
    } else {
      logger.info(`No view defined for ${newLocation.href}`);

      this.destroyOldView();

      await ipcRenderer.send(WHATNOT_WEBSITE_STATUS_UPDATE_EVENT, {status: WhatnotWebsiteStatus.UNKNOWN})
    }
  }

  private async handleNewLiveStreamView() {
    this.destroyOldView();

    logger.debug("Waiting for dom to be created")
    await sleep(500);

    const newSite = new LiveStream();
    await newSite.chatbox.sendChatMessage("The bot has been connected!");

    this.#currentSiteView = newSite;

    await ipcRenderer.send(WHATNOT_WEBSITE_STATUS_UPDATE_EVENT, {status: WhatnotWebsiteStatus.LIVE_STREAM})
  }

  private destroyOldView() {
    if (this.#currentSiteView) {
      logger.debug("destroying old view");
      this.#currentSiteView.destroy()
      this.#currentSiteView = null;
    }
  }
}
