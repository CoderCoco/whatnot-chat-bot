import {mixitup} from "@app/mixitup-interface";
import { app, Menu } from "electron";
import { addLoggingHandler } from "./handle-logging";
import {UserInterface} from "./user-interface";

export async function main() {
  await app.whenReady();

  Menu.setApplicationMenu(null);

  addLoggingHandler();

  await mixitup.commands.ready

  await UserInterface.createUi();
}
