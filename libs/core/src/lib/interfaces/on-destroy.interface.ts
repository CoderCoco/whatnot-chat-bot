/**
 * An interface that indicates a class implements a destroy method.
 */
export interface OnDestroy {
  /**
   * A function that is used to cleanup objects in the class. Use this method
   * to remove subscriptions and timer elements.
   */
  destroy: () => void;
}
