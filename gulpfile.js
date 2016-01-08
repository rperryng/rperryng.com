'use strict';

var gulp = require('gulp');
var env = require('node-env-file');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var del = require('del');

env(__dirname + '/.env');

var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-minify-css': 'minifyCss'
  }
});

var paths = {
  source: {
    styles: {
      theme: './client/src/common/theme.less',
      home: './client/src/home/home.less'
    }
  },
  build: {
    styles: {
      theme: './client/dist/theme?(.min).css',
      home: './client/dist/home?(.min).css'
    },
    root: './client/dist'
  }
};

//
// Styles
//

gulp.task('styles', ['styles-theme', 'styles-home']);

gulp.task('styles-theme', function () {
  return buildStylesStream(paths.source.styles.theme, paths.build.styles.theme, "theme.css");
});

gulp.task('styles-home', function () {
  return buildStylesStream(paths.source.styles.home, paths.build.styles.home, "home.css");
});

function buildStylesStream(sourceFilePaths, staleFilePaths, buildFileName) {
  del(staleFilePaths, {}, function () {
    return gulp.src(sourceFilePaths)
      .pipe(plugins.less())
      .pipe(plugins.concat(buildFileName))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest(paths.build.root))
      .pipe(plugins.minifyCss())
      .pipe(plugins.rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(paths.build.root));
  });
}

gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: 'localhost:' + process.env.PORT,
    files: ['client/dist', 'client/resources'],
    browser: 'firefox'
  });
});

gulp.task('nodemon', function (callback) {
  var started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    if (!started) {
      callback();
      started = true;
    }
  });
});

gulp.task('default', ['browser-sync', 'styles'], function () {
  gulp.watch(paths.source.styles.theme, ['styles-theme']);
  gulp.watch(paths.source.styles.home, ['styles-home']);
});

gulp.task('build', ['styles']);

