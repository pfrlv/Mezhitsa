'use strict';

var gulp = require('gulp');

var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var browsersync = require('browser-sync');
var reload = browsersync.reload;

// Path variables
var path = {
  dev: {
    html: 'src/dev/**/*.html',
    scripts: 'src/dev/assets/scripts/*.js',
    styles: 'src/dev/assets/styles/main.less',
    images: 'src/dev/assets/images/**/*.*',
    fonts: 'src/dev/assets/fonts/**/*.*'
  },
  build: {
    root: 'src/build',
    html: 'src/build',
    scripts: 'src/build/assets/scripts/',
    styles: 'src/build/assets/styles/',
    images: 'src/build/assets/images/',
    fonts: 'src/build/assets/fonts/'
  },
  watch: {
    html: 'src/dev/**/*.html',
    scripts: 'src/dev/assets/scripts/*.js',
    styles: 'src/dev/assets/styles/*.less',
    images: 'src/dev/assets/images/**/*.*',
    fonts: 'src/dev/assets/fonts/**/*.*'
  },
  server: 'src/build/'
};

// Copy .html files
gulp.task('copy:html', function() {
  return gulp.src(path.dev.html)
    .pipe(gulp.dest(path.build.html))
});

// Copy images
gulp.task('copy:images', function() {
  return gulp.src(path.dev.images)
    .pipe(gulp.dest(path.build.images))
});

// Copy other files
gulp.task('copy:misc', function() {
  return gulp.src('src/dev/**/**/*.{txt,ico,pdf}')
    .pipe(gulp.dest(path.build.root))
})

gulp.task('copy', [
  'copy:html',
  'copy:images',
  'copy:misc'
]);

// Work with .less files
gulp.task('styles', function() {
  return gulp.src(path.dev.styles)
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie > 8',
        '> 1%'
      ],
      cascade: true
    }))
    .pipe(csso())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.build.styles));
});

// Work with .js files
gulp.task('scripts', function() {
  return gulp.src(path.dev.scripts)
    .pipe(concat('main.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(path.build.scripts))
});

// BrowserSync config
gulp.task('server', function() {
  browsersync({
    server: path.server,
    notify: false,
    open: false
  });
});

// Watch files
gulp.task('watch', function() {
  gulp.watch(path.watch.html, ['copy:html', reload]);
  gulp.watch(path.watch.styles, ['styles', reload]);
  gulp.watch(path.watch.scripts, ['scripts', reload]);
  gulp.watch(path.watch.images, [reload]);
});

// Main task aka - gulp
gulp.task('default', [
  'copy',
  'styles',
  'scripts',
  'server',
  'watch'
  ]);