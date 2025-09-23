/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  // We're no longer using the preset, but configuring ts-jest manually
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
      compilerOptions: {
        // Explicitly set the module type for tests
        module: "esnext",
      },
    },
  },
};

module.exports = config;