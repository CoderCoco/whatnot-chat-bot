/**
 * An event that will be fired by the UI view when the GO button was clicked and
 * a url was pasted into it.
 */
export const NAVIGATE_TO_URL_EVENT = "ui:navigate"

/**
 * The event arguments that will be sent by {@link NAVIGATE_TO_URL_EVENT}
 */
export interface NavigateToUrlEventArgs {
  /**
   * The URL that the Whatnot window should be navigated to.
   */
  url: string;
}
