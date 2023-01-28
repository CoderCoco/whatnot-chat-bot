import {logCliArguments} from "@app/cli";
import {mixitup} from "@app/mixitup-interface";
import { app, Menu } from "electron";
import * as process from "process";
import { addLoggingHandler } from "./handle-logging";
import {UserInterface} from "./user-interface";

export async function main() {
  await app.whenReady();

  if (require('electron-squirrel-startup')) {
    app.quit();
    return
  }

  Menu.setApplicationMenu(null);

  await addLoggingHandler();
  logCliArguments();

  await mixitup.commands.ready

  await UserInterface.createUi();
}
