import { whatnot } from "@app/whatnot-interface";
import { ChatBox } from "@app/whatnot-render-process";
import { ipcMain } from "electron";

// TODO: Type this method
type KeysProperty = {keys: {keyCode: string}[]};
export function addChatBoxInputHandler() {
  ipcMain.handle(ChatBox.SEND_KEYS_EVENT, async (_, {keys}: KeysProperty) => {
    await whatnot.sendSequence(keys, 10);
  })
}
