import { app, BrowserWindow } from "electron";
import { join } from "path";

export async function main() {
  await app.whenReady();

  createWindow();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  // win.loadFile("assets/index.html");

  win.loadURL("https://www.whatnot.com/");
}