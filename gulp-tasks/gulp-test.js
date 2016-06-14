import gulp from 'gulp';
import karma from 'karma';
import yargs from 'yargs';
import del from 'del';
import path from 'path';

// Specify that singleRun is a boolean so that correctly
// interprets different usages of the argument
const argv = yargs
  .boolean('singleRun')
  .argv;

function runKarma({webpackEntryFile, karmaConfigFile}) {
  const config = {
    configFile: karmaConfigFile,
    singleRun: argv.singleRun,
    files: [
      webpackEntryFile,
      'test/globals.js',
    ],
    preprocessors: {
      [webpackEntryFile]: ['webpack', 'sourcemap'],
      'test/globals.js': ['webpack', 'sourcemap'],
    },
  };

  return function(done) {
    const karmaServer = new karma.Server(config, done);
    karmaServer.start();
  };
}

gulp.task(
  'test:clean',
  () => del.sync(['coverage'])
);

gulp.task(
  'test:unit',
  ['test:clean'],
  runKarma({
    webpackEntryFile: 'test/unit/index.js',
    karmaConfigFile: path.join(__dirname, '../test/unit/karma-unit-config.js'),
  })
);

