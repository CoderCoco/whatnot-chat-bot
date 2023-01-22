import {AppFileBrowserView} from "@app/core";
import {logger} from "@app/logging";
import {WhatnotWebsite} from "@app/whatnot-interface";
import {BrowserWindow} from "electron";

export class UserInterface {

  /**
   * Creates the {@link UserInterface} for the application and waits for it to
   * open.
   *
   * @returns The UserInterface object once it is opened.
   */
  public static async createUi(): Promise<UserInterface> {
    const promises: [Promise<AppFileBrowserView>, Promise<AppFileBrowserView>, Promise<WhatnotWebsite>] = [
      AppFileBrowserView.createView("assets/index.html"),
      AppFileBrowserView.createView("assets/divider.html"),
      WhatnotWebsite.createView()
    ]

    logger.debug("Waiting for all the shit to load");

    const [uiView, dividerView, whatnotWebsite] = await Promise.all(promises);

    logger.debug("Shit has loaded");

    const ui = new UserInterface(
      uiView,
      dividerView,
      whatnotWebsite
    );

    uiView.view.webContents.openDevTools();

    return ui;
  }

  /**
   * The minimum width of the window.
   * @private
   */
  private static readonly MIN_WIDTH = WhatnotWebsite.MIN_WIDTH;

  /**
   * The height of the top controls of the page.
   * @private
   */
  private static readonly CONTROL_HEIGHT = 50;

  /**
   * The height of the divider line.
   * @private
   */
  private static readonly DIVIDER_HEIGHT = 5;

  /**
   * The minimum height of the window.
   * @private
   */
  private static readonly MIN_HEIGHT = UserInterface.CONTROL_HEIGHT + WhatnotWebsite.MIN_HEIGHT + UserInterface.DIVIDER_HEIGHT;

  private readonly window = new BrowserWindow({
    width: UserInterface.MIN_WIDTH,
    height: UserInterface.MIN_HEIGHT,
    minHeight: UserInterface.MIN_HEIGHT + 20,
    minWidth: UserInterface.MIN_WIDTH,
    minimizable: false,
    title: "Dilla 8=====D"
  });

  private constructor(
    private readonly uiView: AppFileBrowserView,
    private readonly dividerView: AppFileBrowserView,
    private readonly whatnotWebsite: WhatnotWebsite
  ) {
    this.addUiView();
    this.addDivider();
    this.addWhatnot();

    this.window.show();
  }

  private addUiView() {
    this.uiView.addToWindow(this.window, {
      bounds: {
        x: 0,
        y: 0,
        height: UserInterface.CONTROL_HEIGHT,
        width: UserInterface.MIN_WIDTH
      }
    });
  }

  private addDivider() {
    this.dividerView.addToWindow(this.window, {
      bounds: {
        x: 0,
        y: UserInterface.CONTROL_HEIGHT,
        height: UserInterface.DIVIDER_HEIGHT,
        width: UserInterface.MIN_WIDTH + 10
      },
      resizeOptions: {
        width: true
      }
    });
  }

  private addWhatnot() {
    this.whatnotWebsite.appUrlBrowserView.addToWindow(this.window, {
      bounds: {
        x: 0,
        y: UserInterface.CONTROL_HEIGHT + UserInterface.DIVIDER_HEIGHT,
        height: WhatnotWebsite.MIN_HEIGHT,
        width: WhatnotWebsite.MIN_WIDTH
      },
      resizeOptions: {
        width: true,
        height: true
      }
    });
  }
}
