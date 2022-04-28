require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  rootDir: './',
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  transformIgnorePatterns: ['^.+\\.js$'],
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.ts', 'module.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
    jsx: 'react',
    sourceMap: false,
    experimentalDecorators: true,
    noImplicitUseStrict: true,
    removeComments: true,
    moduleResolution: 'node',
    lib: ['es2017', 'dom'],
    esModuleInterop: true,
    typeRoots: ['node_modules/@types', 'src/@types'],
  },
};
