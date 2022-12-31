import { app, ipcMain } from "electron";
import { whatnot } from "@app/whatnot-interface"

export async function main() {
  await app.whenReady();

  ipcMain.handle('logger:sendMessage', (...args: any[]) => {
    console.log(args);
  });

  whatnot.open();
}