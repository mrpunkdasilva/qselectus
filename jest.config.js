module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js',
    '!webpack.config.js',
    '!.eslintrc.js',
    '!dist/**',
    '!coverage/**',
    '!node_modules/**'
  ]
};