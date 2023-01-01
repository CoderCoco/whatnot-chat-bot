import {logger} from "@app/logging";
import {SiteView} from "./whatnot/site-view/site-view";
// import {SiteWatcher} from "./whatnot/site-watcher";
// async function trySendMessage() {
//   logger.verbose("Attempting to send a chat message");
//
//   try {
//     // TODO: Add listener to check for when a stream is entered/left
//     new ChatBox();
//
//     // await chatbox.sendChatMessage("Hello Dilla, I sent this from the app");
//     // await chatbox.sendChatMessage("I figured out that I don't actually have to wait for you to go live.");
//     // await chatbox.sendChatMessage("It sends messages while you aren't live too lmao xD");
//   } catch (e) {
//     window.setTimeout(trySendMessage, 5000)
//   }
// }

export async function appEntry() {
  document.addEventListener("DOMContentLoaded", startWhenReady);
}

function startWhenReady() {
  document.removeEventListener("DOMContentLoaded", startWhenReady);

  logger.debug("Document is ready, injecting the site view now");
  new SiteView();
}
