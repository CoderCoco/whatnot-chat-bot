import { app } from "electron";
import { whatnot } from "@app/whatnot-interface";
import { addLoggingHandler } from "./handle-logging";
import { addChatBoxInputHandler } from "./handle-chatbox-input";

export async function main() {
  await app.whenReady();

  addLoggingHandler();
  addChatBoxInputHandler();

  whatnot.open();
}