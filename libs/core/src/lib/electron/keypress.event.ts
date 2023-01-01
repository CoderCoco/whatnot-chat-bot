import { KeyboardInputEvent } from "electron";

export type KeypressEvent = Omit<KeyboardInputEvent, 'type'>