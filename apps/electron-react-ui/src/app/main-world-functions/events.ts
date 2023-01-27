import {IpcEvents} from "@app/electron-react-bridge";

/**
 * Gets a reference to the {@link IpcEvents} object provided by the bridge
 * function.
 */
export const events: IpcEvents = (window as any).events;
