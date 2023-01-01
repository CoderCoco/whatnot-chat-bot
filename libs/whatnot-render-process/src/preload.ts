import { logger } from '@app/logging';
import { ChatBox } from './whatnot';

async function trySendMessage() {
  logger.verbose("Attempting to send a chat message");

  try {
    const chatbox = new ChatBox()

    await chatbox.sendChatMessage("Hello Dilla, I sent this from the app");
    await chatbox.sendChatMessage("I figured out that I don't actually have to wait for you to go live.");
    await chatbox.sendChatMessage("It sends messages while you aren't live too lmao xD");
  } catch (e) {
    window.setTimeout(trySendMessage, 5000)
  }
}

export async function appEntry() {
  // Just try to send the message and it will stop after 1 attempt.
  trySendMessage();
}