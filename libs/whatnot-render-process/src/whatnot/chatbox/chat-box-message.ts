/**
 * A class that represents the value of a single chat message.
 */
export class ChatBoxMessage {
  /**
   * The user that sent the chat message.
   */
  public readonly user: string;

  /**
   * The message that was sent.
   */
  public readonly message: string;

  /**
   * Constructs the chat message by processing the node. If the structure
   * ever changes, this is the method that will break.
   *
   * @param value The HTML Node to process.
   */
  constructor(value: Node) {
    this.user = value.childNodes[1].childNodes[0].textContent ?? ""
    this.message = value.childNodes[1].childNodes[1].textContent ?? ""
  }
}