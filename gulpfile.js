var gulp = require('gulp'),
  del = require('del');

var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-minify-css': 'minifyCss'
  }
});

var paths = {
  source: './client/src/common/*.less',
  build: {
    root: './client/dist',
    styles: './client/dist/theme?(.min).css'
  }
};

gulp.task('styles-clean', function () {
  return del(paths.build.styles);
});

gulp.task('styles-build', ['styles-clean'], function () {
  return gulp.src(paths.source)
    .pipe(plugins.less())
    .pipe(plugins.concat('theme.css'))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(paths.build.root))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(paths.build.root));
});

gulp.task('styles', ['styles-build'], function () {
});

gulp.task('default', ['styles'], function () {
  gulp.watch(paths.source, ['styles']);
});
