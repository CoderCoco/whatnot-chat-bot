import { main } from "./app/entry";

main()
  .catch(e => console.error(e));

  // Also update build to use the nx processes

// Force tsconfig paths to be included in the application output.
// this is needed for the render process.
export * from 'tsconfig-paths';
