import { KeypressEvent } from "@app/core";

/**
 * An event that is fired from the whatnot render process that tells the application
 * which keys should be pressed.
 */
export const WHATNOT_CHAT_SEND_KEYS_EVENT = "whatnot:chat:send-keys"

/**
 * The arguments that are sent with the {@link WHATNOT_CHAT_SEND_KEYS_EVENT}.
 */
export interface WhatnotChatSendKeyEventArg {
  /**
   * A sequence of keys to send.
   */
  keys: KeypressEvent[]
}
