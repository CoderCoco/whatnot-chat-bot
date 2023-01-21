import {logger} from "@app/logging";
import {WhatnotWebsite} from "@app/whatnot-interface";
import {BrowserWindow, BrowserView} from "electron";

export class UserInterface {

  /**
   * Creates the {@link UserInterface} for the application and waits for it to
   * open.
   *
   * @returns The UserInterface object once it is opened.
   */
  public static async createUi(): Promise<UserInterface> {
    const ui = new UserInterface();
    await ui.loadContents();

    return ui;
  }

  private static readonly MIN_WIDTH = WhatnotWebsite.MIN_WIDTH;

  private static readonly CONTROL_HEIGHT = 50;
  private static readonly DIVIDER_HEIGHT = 5;
  private static readonly MIN_HEIGHT = UserInterface.CONTROL_HEIGHT + WhatnotWebsite.MIN_HEIGHT + UserInterface.DIVIDER_HEIGHT;

  private readonly whatnot = new WhatnotWebsite();
  private static readonly INDEX_URL = "assets/index.html";

  private readonly window = new BrowserWindow({
    width: UserInterface.MIN_WIDTH,
    height: UserInterface.MIN_HEIGHT,
    minHeight: UserInterface.MIN_HEIGHT + 20,
    minWidth: UserInterface.MIN_WIDTH,
    minimizable: false,
    title: "Dilla 8=====D"
  });
  private readonly uiView = new BrowserView();

  private constructor() {
    logger.debug("Creating the UI Window");
  }

  private async loadContents(): Promise<void> {
    this.window.addBrowserView(this.uiView);
    this.uiView.setBounds({x: 0, y: 0, height: UserInterface.CONTROL_HEIGHT, width: UserInterface.MIN_WIDTH});

    logger.info("Opening the UserInterface file");

    await this.uiView.webContents.loadFile(UserInterface.INDEX_URL);

    logger.debug("Creating the divider window");
    // TODO: Probably should make this into a class for the 2 views
    const dividerWindow = new BrowserView();
    dividerWindow.setBounds({x: 0, y: UserInterface.CONTROL_HEIGHT, height: UserInterface.DIVIDER_HEIGHT, width: UserInterface.MIN_WIDTH + 10})
    this.window.addBrowserView(dividerWindow);
    dividerWindow.webContents.openDevTools();
    dividerWindow.setAutoResize({width: true});
    await dividerWindow.webContents.loadFile("assets/divider.html");

    await this.whatnot.open();
    this.window.addBrowserView(this.whatnot.window);
    this.whatnot.window.setBounds({x: 0, y: UserInterface.CONTROL_HEIGHT + UserInterface.DIVIDER_HEIGHT, height: WhatnotWebsite.MIN_HEIGHT, width: WhatnotWebsite.MIN_WIDTH})
    this.whatnot.window.setAutoResize({
      width: true,
      height: true
    });

    logger.info(`Opened whatnot website: ${this.whatnot.toString()}`)

    this.window.show();
  }
}
