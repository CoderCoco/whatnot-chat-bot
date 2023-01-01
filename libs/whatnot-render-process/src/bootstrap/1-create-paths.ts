const tsConfigPaths = require("tsconfig-paths");
const tsConfigJson = require("../../../../../tsconfig.base.json")

type PathsObject = {[key: string]: string[]}

// Parse Paths
const evaluatedPaths: PathsObject = {};
const tsConfigPathVariable: PathsObject = tsConfigJson.compilerOptions.paths

for (const [key, value] of Object.entries<string[]>(tsConfigPathVariable)) {
  evaluatedPaths[key] = value.map((entry: string) => {
    return `dist/${entry}`.replace('index.ts', 'index.js');
  })
}

tsConfigPaths.register({
  baseUrl: "./",
  paths: evaluatedPaths
});