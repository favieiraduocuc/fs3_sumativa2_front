module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],

    client: {
      jasmine: {
        random: true
      },
      clearContext: false
    },

    reporters: ['progress', 'kjhtml', 'coverage'],

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly', file: 'lcov.info' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },

    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
    singleRun: true
  });
};
