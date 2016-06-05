import gulp from 'gulp';
import del from 'del';
import gutil from 'gutil';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';

gulp.task('build', ['clean'], (done) => {
  webpack(webpackConfig, (err, bundleStatus) => {
    if (err) {
      done(err);
    } else {
      gutil.log('[webpack]', bundleStatus.toString({
        colors: true,
      }));
      done();
    }
  });
});

gulp.task('clean', () => del.sync(['dist/**/*']));

gulp.task('build:watch', ['build'], () => gulp.watch('./src/**/*.*', ['build']));
