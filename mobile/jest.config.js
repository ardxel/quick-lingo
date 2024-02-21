/* eslint-disable @typescript-eslint/no-var-requires */
const { compilerOptions } = require("./tsconfig.json");
/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts", "tsx", "jsx"],
  roots: ["<rootDir>"],

  testEnvironment: "node",
  preset: "react-native",
  modulePaths: [compilerOptions.baseUrl],
};
