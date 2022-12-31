import { app } from "electron";
import { whatnot } from "@app/whatnot-interface"

export async function main() {
  await app.whenReady();

  whatnot.open();
}