const webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    browsers: [ 'Chrome' ],
    files: [
      {
        pattern: 'test/tests.bundle.js',
        watched: false,
      },
    ],
    frameworks: [ 'jasmine' ],
    preprocessors: {
      'test/tests.bundle.js': [ 'webpack', 'sourcemap' ],
    },
    reporters: [ 'dots' ],
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
