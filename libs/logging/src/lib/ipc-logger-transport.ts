import * as Transport from 'winston-transport'
import { ipcRenderer } from 'electron'

export class IPCLoggerTransport extends Transport {
  public static readonly LOG_EVENT = "logger:sendMessage";

  public override log(info: any, callback: any) {
    console.log(info);
    ipcRenderer.invoke(IPCLoggerTransport.LOG_EVENT, info)

    callback();
  }
}
