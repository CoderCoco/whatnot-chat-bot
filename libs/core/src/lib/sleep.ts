/**
 * Wait for a specific amount of time before continuing.
 * @param durationMs The time in milliseconds to wait.
 */
export async function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

/**
 * Waits for the next tick in the process execution cycle.
 */
export async function tick(): Promise<void> {
  return new Promise((resolve) => {
    process.nextTick(resolve);
  });
}