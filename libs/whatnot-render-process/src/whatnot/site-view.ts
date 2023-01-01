import {OnDestroy} from "@app/core";
import {logger} from "@app/logging";
import {SiteWatcher} from "./site-watcher";

export class SiteView {
  readonly #siteWatcher = new SiteWatcher();

  constructor() {
    logger.debug("Constructing a SiteView")
  }

  // The current site view must always have a destroy method. So cleanup can
  // be performed based on the views.
  #currentSiteView: OnDestroy | null = null
}
