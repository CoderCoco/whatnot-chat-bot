import {AppFileBrowserView} from "@app/core";
import {logger} from "@app/logging";
import {WhatnotWebsite} from "@app/whatnot-interface";
import {BrowserWindow} from "electron";
import * as path from 'path';

export class UserInterface {
  /**
   * The minimum width of the window.
   * @private
   */
  private static readonly MIN_WIDTH = WhatnotWebsite.MIN_WIDTH;

  /**
   * The height of the top controls of the page.
   * @private
   */
  private static readonly CONTROL_HEIGHT = 75;

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


  /**
   * Creates the {@link UserInterface} for the application and waits for it to
   * open.
   *
   * @returns The UserInterface object once it is opened.
   */
  public static async createUi(): Promise<UserInterface> {
    const window = new BrowserWindow({
      width: UserInterface.MIN_WIDTH,
      height: UserInterface.MIN_HEIGHT,
      minHeight: UserInterface.MIN_HEIGHT + 20,
      minWidth: UserInterface.MIN_WIDTH,
      minimizable: false,
      title: "Dilla 8=====D"
    });

    const promises: [Promise<AppFileBrowserView>, Promise<AppFileBrowserView>, Promise<WhatnotWebsite>] = [
      UserInterface.createUiView(window),
      UserInterface.createDividerView(window),
      WhatnotWebsite.createView()
    ]

    logger.debug("Waiting for all the shit to load");

    const [uiView, dividerView, whatnotWebsite] = await Promise.all(promises);

    uiView.view.webContents.openDevTools();

    logger.debug("Shit has loaded");

    const ui = new UserInterface(
      window,
      uiView,
      dividerView,
      whatnotWebsite
    );

    return ui;
  }

  private static async createUiView(window: BrowserWindow): Promise<AppFileBrowserView> {
    return AppFileBrowserView.createView(
      "../electron-react-ui/index.html",
      window,
      {
        bounds: {
          x: 0,
          y: 0,
          height: UserInterface.CONTROL_HEIGHT,
          width: UserInterface.MIN_WIDTH
        }
      },
      {
        webPreferences: {
          sandbox: false,
          preload: path.join(__dirname, "../../libs/electron-react-bridge/src/index.js")
        }
      }
    );
  }

  private static async createDividerView(window: BrowserWindow): Promise<AppFileBrowserView> {
      return AppFileBrowserView.createView(
        "assets/divider.html",
        window,
        {
          bounds: {
            x: 0,
            y: UserInterface.CONTROL_HEIGHT,
            height: UserInterface.DIVIDER_HEIGHT,
            width: UserInterface.MIN_WIDTH + 10
          },
          resizeOptions: {
            width: true
          }
        }
      );
  }

  private constructor(
    private readonly window: BrowserWindow,

    private readonly uiView: AppFileBrowserView,
    private readonly dividerView: AppFileBrowserView,
    private readonly whatnotWebsite: WhatnotWebsite
  ) {
    this.addWhatnot();

    this.window.show();
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
