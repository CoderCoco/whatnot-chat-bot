import {KeypressEvent} from "@app/core";

/**
 * An event that will be fired by the whatnot render process that indicates
 * a chat message was received.
 */
export const WHATNOT_CHAT_RECEIVE_EVENT = "whatnot:chat:receive"

/**
 * An event that the whatnot render process listens to in order to send a chat
 * message to the website.
 */
export const WHATNOT_CHAT_SEND_EVENT = "whatnot:chat:send"

/**
 * The type of data expected to be passed on the {@link WHATNOT_CHAT_SEND_EVENT}.
 */
export type WhatnotChatSendEventArg = {message: string}

/**
 * An event that is fired from the whatnot render process that tells the application
 * which keys should be pressed.
 */
export const WHATNOT_CHAT_SEND_KEYS_EVENT = "whatnot:chat:send-keys"
export interface WhatnotChatSendKeyEventArg {
  keys: KeypressEvent[]
}

/**
 * An event that is fired when the website status changes.
 */
export const WHATNOT_WEBSITE_STATUS_UPDATE_EVENT = "whatnot:main:status"

/**
 * An enum that describes the current view status of the whatnot website
 */
export enum WhatnotWebsiteStatus {
  LIVE_STREAM,
  UNKNOWN
}

/**
 * The type of data expected to be passed on the {@link WHATNOT_WEBSITE_STATUS_UPDATE_EVENT}
 */
export type WhatnotWebsiteStatusUpdateArg = { status: WhatnotWebsiteStatus }
