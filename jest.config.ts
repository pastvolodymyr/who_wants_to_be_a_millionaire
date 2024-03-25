import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/$1',
    '^.+\\.(svg)$': '<rootDir>/src/__mocks__/svg.tsx',
  }
};

export default createJestConfig(config);
