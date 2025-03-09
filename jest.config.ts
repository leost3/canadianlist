import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',         // Use ts-jest to transform TypeScript files
  testEnvironment: 'node',   // Set the test environment to Node.js
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  }
};

export default config;