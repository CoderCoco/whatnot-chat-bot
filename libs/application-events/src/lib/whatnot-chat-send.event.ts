/**
 * An event that the whatnot render process listens to in order to send a chat
 * message to the website.
 */
export const WHATNOT_CHAT_SEND_EVENT = "whatnot:chat:send"

/**
 * The type of data expected to be passed on the {@link WHATNOT_CHAT_SEND_EVENT}.
 */
export type WhatnotChatSendEventArg = {message: string}
