import {mixitup} from "@app/mixitup-interface";
import { app } from "electron";
import { whatnot } from "@app/whatnot-interface";
import { addLoggingHandler } from "./handle-logging";

export async function main() {
  await app.whenReady();

  addLoggingHandler();

  await mixitup.commands.ready

  await whatnot.open();
}
