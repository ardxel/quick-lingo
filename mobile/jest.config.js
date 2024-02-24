/* eslint-env node */

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts", "tsx", "jsx"],
  roots: ["<rootDir>"],
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  modulePaths: [require("./tsconfig.json").compilerOptions.baseUrl],
};
