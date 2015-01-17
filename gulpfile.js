var gulp = require('gulp'),
  del = require('del');

var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-minify-css': 'minifyCss'
  }
});

var paths = {
  source: {
    theme: './client/src/common/*.less',
    home: './client/src/pages/home.less',
    projects: './client/src/pages/projects.less'
  },
  build: {
    root: './client/dist',
    theme: './client/dist/theme?(.min).css',
    home: './client/dist/home(.min).css',
    projects: './client/dist/projects(.min).css'
  }
};

gulp.task('styles-build-theme', function () {
  return buildStylesStream(paths.source.theme, paths.build.theme, "theme.css");
});

gulp.task('styles-build-home', function () {
  return buildStylesStream(paths.source.home, paths.build.home, "home.css");
});

gulp.task('styles-build-projects', function () {
  return buildStylesStream(paths.source.projects, paths.build.projects, "projects.css");
});

gulp.task('styles-build', [
  'styles-build-theme',
  'styles-build-home',
  'styles-build-projects'
]);

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

gulp.task('styles', ['styles-build']);

gulp.task('default', ['styles'], function () {
  gulp.watch(paths.source.theme, ['styles-build-theme']);
  gulp.watch(paths.source.home, ['styles-build-home']);
  gulp.watch(paths.source.projects, ['styles-build-projects']);
});
