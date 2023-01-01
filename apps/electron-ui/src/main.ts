import { main } from "./app/entry";

main()
  .catch(e => console.error(e));

// Force tsconfig paths to be included in the application output.
// this is needed for the render process.
export * from 'tsconfig-paths';
