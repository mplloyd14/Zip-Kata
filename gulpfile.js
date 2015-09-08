var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var config = require('./config/development');

/**
 * Serve and watch for changes
 */
gulp.task('serve', function() {
  var port = config.port;
  shell.task(['npm run-script start-dev']);
  browserSync.init({
    proxy: "localhost:" + port,
    port: 1337,
    ui: {
      port: 1338
    }
  });

  gulp.watch("content/web/public/scss/*.scss", ['sass']);
  gulp.watch("content/**/*.scss").on('change', browserSync.reload);
});

// Import data into your local mongo collection.
gulp.task('import', shell.task([ './scripts/import.sh' ]));

// Make sure all javascript is good...
gulp.task('check', function () {
  return gulp.src('content/web/public/**/*.js')
      .pipe(jscs());
});

gulp.task('dev', shell.task(['npm run-script start-dev']));

/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function() {
  return gulp.src("./content/web/public/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./content/web/public/css"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
