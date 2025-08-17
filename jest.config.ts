import type { Config } from 'jest';

const config: Config = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
    }],
  },

  // Enable ES modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Use jsdom environment for browser-like testing
  testEnvironment: 'jsdom',
  
  // Used for mocking CSS Modules
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Transform node_modules if needed
  transformIgnorePatterns: [
    'node_modules/(?!(react-markdown|remark-gfm|vfile|vfile-message|unist-util-stringify-position|periscopic|is-reference|estree-walker|zustand)/)',
  ],

  // Enable ES modules
  preset: undefined,
};

export default config;
