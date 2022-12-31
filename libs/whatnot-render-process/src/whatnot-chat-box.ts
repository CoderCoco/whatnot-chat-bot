export class ChatBox {
  readonly #chatDomElement: HTMLInputElement;

  constructor() {
    const input = document.querySelector(".chatInput");

    if (input == null) {
      throw new Error("Unable to find chatbox")
    }

    this.#chatDomElement = input as HTMLInputElement
  }

  public sendChatMessage(message: string) {
    this.#chatDomElement.value = message;

    this.sendEnter();
  }

  private sendEnter() {
    this.#chatDomElement
      .dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          keyCode: 13
        })
      )
  }
}