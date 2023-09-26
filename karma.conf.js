// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-sonarqube-unit-reporter'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './analytics/coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'cobertura' },
        { type: 'lcovonly', subdir: 'lcov' }
      ]
    },
    junitReporter: {
     outputDir: 'analytics/junit', // results will be saved as $outputDir/$browserName.xml
     outputFile: 'report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
     useBrowserName: false, // add browser name to report and classes names
   },
   sonarQubeUnitReporter: {
    sonarQubeVersion: 'LATEST',
    outputFile: 'analytics/ut_report.xml',
    overrideTestDescription: true,
    useBrowserName: false,
    testFilePattern: '.spec.ts',
    testPaths: ['./src']
  },
   reporters: ['progress', 'kjhtml', 'junit', 'sonarqubeUnit'],
   port: 9876,
   colors: true,
   logLevel: config.LOG_INFO,
   autoWatch: true,
   browsers: ['Chrome', 'ChromeHeadlessNoSandbox'],
   captureTimeout: 210000,
   browserDisconnectTolerance: 3,
   browserDisconnectTimeout: 210000,
   browserNoActivityTimeout: 210000,
   customLaunchers: {
     ChromeHeadlessNoSandbox: {
       base: 'ChromeHeadless',
       flags: [
         '--no-sandbox',
         '--remote-debugging-port=9222',
       ]
     }
   },
   singleRun: false,
   restartOnFileChange: true
 });
};
