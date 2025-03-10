module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],
  setupFiles: [],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
