import sharedWebpackConfig from '../../webpack.config';
import path from 'path';

// A SourceMap is added as DataUrl to the JavaScript file.
// See: https://webpack.github.io/docs/configuration.html#devtool
const webpackConfig = Object.assign({}, sharedWebpackConfig, {
  devtool: 'inline-source-map',
});

// When running unit tests we need to include
// the isparta loader to enable code coverage.
webpackConfig.module = Object.assign({}, webpackConfig.module, {
  postLoaders: [{
    test: /\.jsx?$/,
    include: path.resolve('src/'),
    loader: 'isparta',
  }],
});

module.exports = function(config) {
  return config.set({

    basePath: '../..',

    frameworks: ['mocha', 'sinon'],

    webpack: webpackConfig,

    // Normally webpack will display a lot of output,
    // but this config disables that output.
    webpackMiddleware: { noInfo: true, quiet: true },

    browsers: ['Chrome'],

    colors: true,

    reporters: [process.env.KARMA_REPORTER || 'mocha', 'coverage', 'threshold'],

    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
      ],
    },

    thresholdReporter: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },

  });
};
