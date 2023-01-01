import { whatnot } from "@app/whatnot-interface";
import { ChatBox } from "@app/whatnot-render-process";
import { ipcMain } from "electron";
import { KeypressEvent } from "@app/core";

// TODO: Type this method
type KeysProperty = {keys: KeypressEvent[]};
export function addChatBoxInputHandler() {
  ipcMain.handle(ChatBox.SEND_KEYS_EVENT, async (_, {keys}: KeysProperty) => {
    await whatnot.appUrlWindow.sendSequence(keys);
  })
}
