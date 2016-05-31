var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
// var typeset = require('gulp-typeset');
var uglifycss = require('gulp-uglifycss');

var browsersync = require('browser-sync').create();



// PATH destination

var path = {
  HTML: 'src/**/*.html',
  CSS: 'src/css/**/*.*',
  SASS: 'src/sass/**/*.scss',
  ASSETS: 'src/assets/**/*.*',
  JS: 'src/js/**/*.js',
  ALL: ['src/index.html', 'src/sass/**/*.scss'],
  DEST_SRC: 'dist/src',
  DEST_SRC_ASSETS: 'dist/src/assets',
  DEST: 'dist'
};

// SASS processing

gulp.task('process', function() {

  return gulp.src(path.SASS)
    .pipe(sass())
    .pipe(autoprefixer('last 5 version'))
    .pipe(uglifycss({
      'maxLineLen': 80,
      'uglyComments': true
    }))
    .pipe(gulp.dest(path.DEST_SRC))
    .pipe(browsersync.stream());
});


// Browser sync

gulp.task('browsersync', ['process'], function() {

  browsersync.init({
    server: path.DEST
  });

});

// Copy HTML to dist location

gulp.task('copyHTML', function() {
  return gulp.src(path.HTML)
    // .pipe(typeset())
    .pipe(gulp.dest(path.DEST));
});

// Copy CSS to dist/src location

gulp.task('copyCSS', function() {
  return gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_SRC));
});

// Copy CSS to dist/src location

gulp.task('copyJavascript', function() {
  return gulp.src(path.JS)
    .pipe(gulp.dest(path.DEST_SRC));
});

// Copy ASSETS to dist/src location

gulp.task('copyAssets', function() {
  return gulp.src(path.ASSETS)
    .pipe(gulp.dest(path.DEST_SRC_ASSETS));
});

//  Gulp Watch


gulp.task('watch',['copyHTML','copyCSS','copyJavascript', 'copyAssets', 'browsersync'], function(){
  gulp.watch(path.HTML, ['copyHTML']);
  gulp.watch(path.CSS, ['copyCSS']);
  gulp.watch(path.JS, ['copyJavascript']);
  gulp.watch(path.ASSETS, ['copyAssets']);
  gulp.watch(path.SASS, ['process']);
  gulp.watch('dist/**/*.html').on('change', browsersync.reload);
  gulp.watch('dist/**/*.js').on('change', browsersync.reload);
})

// // Default Gulp Task

gulp.task('default', ['watch']);
