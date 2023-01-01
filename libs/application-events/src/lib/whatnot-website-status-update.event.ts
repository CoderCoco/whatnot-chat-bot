/**
 * An event that is fired when the website status changes.
 */
export const WHATNOT_WEBSITE_STATUS_UPDATE_EVENT = "whatnot:main:status"

/**
 * An enum that describes the current view status of the whatnot website
 */
export enum WhatnotWebsiteStatus {
  /** the status is that the page is viewing a livestream */
  LIVE_STREAM,

  /** The page view is unknown */
  UNKNOWN
}

/**
 * The type of data expected to be passed on the {@link WHATNOT_WEBSITE_STATUS_UPDATE_EVENT}
 */
export type WhatnotWebsiteStatusUpdateArg = { status: WhatnotWebsiteStatus }
