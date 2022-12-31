const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
  baseUrl: "./",
  paths: {
    "@app/logging": ["dist/libs/logging/src/index.js"],
    "@app/whatnot-interface": ["dist/libs/whatnot-interface/src/index.js"],
    "@app/whatnot-render-process": [
      "dist/libs/whatnot-render-process/src/index.js"
    ]
  }
});