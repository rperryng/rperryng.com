var gulp = require('gulp'),
  del = require('del');

var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-minify-css': 'minifyCss'
  }
});

var paths = {
  source: {
    styles: {
      theme: './client/src/common/*.less',
      home: './client/src/home/home.less',
      projects: './client/src/projects/projects.less'
    },
    scripts: {
      home: './client/src/home/home.js',
      projects: './client/src/projects/projects.js'
    }
  },
  build: {
    styles: {
      theme: './client/dist/theme?(.min).css',
      home: './client/dist/home(.min).css',
      projects: './client/dist/projects(.min).css'
    },
    scripts: {
      home: './client/dist/home(.min).js',
      projects: './client/dist/projects(.min).js'
    },
    root: './client/dist'
  }
};

// 
// Styles
// 

gulp.task('styles-build-theme', function () {
  return buildStylesStream(paths.source.styles.theme, paths.build.styles.theme, "theme.css");
});

gulp.task('styles-build-home', function () {
  return buildStylesStream(paths.source.styles.home, paths.build.styles.home, "home.css");
});

gulp.task('styles-build-projects', function () {
  return buildStylesStream(paths.source.styles.projects, paths.build.styles.projects, "projects.css");
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

//
// Scripts
//

gulp.task('scripts-build-home', function () {
  return buildScriptsStream(paths.source.scripts.home, paths.build.scripts.home);
});

gulp.task('scripts-build-projects', function () {
  return buildScriptsStream(paths.source.scripts.projects, paths.build.scripts.projects);
});

gulp.task('scripts-build', ['scripts-build-home', 'scripts-build-projects']);

function buildScriptsStream(sourceFilePaths, staleFilePaths) {
  del(staleFilePaths, {}, function () {
    return gulp.src(sourceFilePaths)
      .pipe(gulp.dest(paths.build.root))
      .pipe(plugins.uglify({
        mangle: true
      }))
      .pipe(plugins.rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(paths.build.root));
  });
}

gulp.task('scripts', ['scripts-build']);

//
// Watches
// 

gulp.task('default', ['styles', 'scripts'], function () {
  gulp.watch(paths.source.styles.theme, ['styles-build-theme']);
  gulp.watch(paths.source.styles.home, ['styles-build-home']);
  gulp.watch(paths.source.styles.projects, ['styles-build-projects']);

  gulp.watch(paths.source.scripts.home, ['scripts-build-home']);
  gulp.watch(paths.source.scripts.projects, ['scripts-build-projects']);
});
