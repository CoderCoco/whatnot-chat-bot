import {NAVIGATE_TO_URL_EVENT, NavigateToUrlEventArgs} from "@app/application-events";
import {AppFileBrowserView, IpcMainEventListener, getFileRelativeToDist} from "@app/core";
import {logger} from "@app/logging";
import {WhatnotWebsite} from "@app/whatnot-interface";
import {BrowserWindow} from "electron";

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
  private static readonly MIN_HEIGHT = UserInterface.CONTROL_HEIGHT + WhatnotWebsite.MIN_HEIGHT + UserInterface.DIVIDER_HEIGHT + 20;

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
      minHeight: UserInterface.MIN_HEIGHT,
      minWidth: UserInterface.MIN_WIDTH,
      minimizable: false,
      resizable: false,
      title: "Dilla 8=====D"
    });

    const promises: [Promise<AppFileBrowserView>, Promise<AppFileBrowserView>, Promise<WhatnotWebsite>] = [
      UserInterface.createUiView(window),
      UserInterface.createDividerView(window),
      WhatnotWebsite.createView()
    ]

    logger.debug("Waiting for all the shit to load");

    const [uiView, dividerView, whatnotWebsite] = await Promise.all(promises);

    logger.debug("Shit has loaded");

    const ui = new UserInterface(
      window,
      uiView,
      dividerView,
      whatnotWebsite
    );

    logger.info("Loading has completed. Enable resize capabilities");
    window.setResizable(true);
    window.setMinimumSize(UserInterface.MIN_WIDTH, UserInterface.MIN_HEIGHT);

    return ui;
  }

  private static async createUiView(window: BrowserWindow): Promise<AppFileBrowserView> {
    return AppFileBrowserView.createView(
      getFileRelativeToDist('apps/electron-react-ui/index.html'),
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
          preload: getFileRelativeToDist('libs/electron-react-bridge/src/index.js')
        }
      }
    );
  }

  private static async createDividerView(window: BrowserWindow): Promise<AppFileBrowserView> {
      return AppFileBrowserView.createView(
        getFileRelativeToDist('apps/electron-ui/assets/divider.html'),
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
  private readonly goToEventListener = new IpcMainEventListener(NAVIGATE_TO_URL_EVENT, this.handleGoToNavigation.bind(this));

  private constructor(
    private readonly window: BrowserWindow,

    private readonly uiView: AppFileBrowserView,
    private readonly dividerView: AppFileBrowserView,
    private readonly whatnotWebsite: WhatnotWebsite
  ) {
    this.addWhatnot();

    this.window.show();
  }

  private async handleGoToNavigation(_: Electron.IpcMainInvokeEvent, arg: NavigateToUrlEventArgs): Promise<void> {
    logger.debug(`Received goToNavigation link ${arg.url}`);

    await this.whatnotWebsite.appUrlBrowserView.loadUrl(arg.url);
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
