import { ChatBox } from "./whatnot-chat-box";
import { logger } from '@app/logging';

async function trySendMessage() {
  logger.verbose("Attempting to send a chat message");

  try {
    const chatbox = new ChatBox()

    await chatbox.sendChatMessage("Hello dilla, I sent this from the app");
  } catch (e) {
    window.setTimeout(trySendMessage, 5000)
  }
}

export async function appEntry() {
  // Just try to send the message and it will stop after 1 attempt.
  trySendMessage();
}