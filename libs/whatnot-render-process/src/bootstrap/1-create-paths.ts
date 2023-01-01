const path = require("path");

const loadPath: string = path.join(__dirname, "../../../../tsconfig.base.json");
console.log("loading from", loadPath);

const tsConfigPaths = require("tsconfig-paths");
const tsConfigJson = require(loadPath)

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