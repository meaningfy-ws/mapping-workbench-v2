export default {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map .js imports to .ts files
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM support in ts-jest
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ESM
};