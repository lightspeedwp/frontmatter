export default {
  displayName: 'frontmatter-yaml-handler',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
  collectCoverageFrom: [
    'scripts/**/*.js',
    'skill/**/*.js',
    '!scripts/**/*.test.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'html', 'lcov', 'json'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 75,
      lines: 55,
      statements: 55
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  verbose: true,
  bail: false,
  detectOpenHandles: true,
  forceExit: false,
  testTimeout: 10000,
  maxWorkers: '50%'
};
