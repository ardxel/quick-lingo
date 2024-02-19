/* eslint-disable @typescript-eslint/no-var-requires */
const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');
/** @type {import('jest').Config} */
module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    roots: ['<rootDir>'],
    testRegex: '.*\\.spec\\.ts$',

    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    preset: 'ts-jest',
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
};
