import * as Transport from 'winston-transport'
import { ipcRenderer } from 'electron'

export class IPCLoggerTransport extends Transport {
  public override log(info: any, callback: any) {
    console.log(info);
    ipcRenderer.invoke("logger:sendMessage", info)

    callback();
  }
}