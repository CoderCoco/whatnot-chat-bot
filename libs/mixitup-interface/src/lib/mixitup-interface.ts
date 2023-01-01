import {Commands} from "./commands";

class MixitupInterface {
  public readonly commands = new Commands();
}

export const mixitup = new MixitupInterface();
