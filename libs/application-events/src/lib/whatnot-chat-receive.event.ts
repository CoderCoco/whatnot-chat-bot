/**
 * An event that will be fired by the whatnot render process that indicates
 * a chat message was received.
 */
export const WHATNOT_CHAT_RECEIVE_EVENT = "whatnot:chat:receive"

/**
 * The event arguments that will be sent by {@link WHATNOT_CHAT_RECEIVE_EVENT}
 */
export interface WhatnotChatReceiveEventArg {
  message: string;
  user: string;
}
