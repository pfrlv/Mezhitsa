'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var postcss = require('gulp-postcss');
var lost = require('lost');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

// Path variables
var path = {
  src: {
    scripts: 'src/js/*.js',
    styles: 'src/less/style.less',
    images: 'src/img/*.*'
  },
  dist: {
    scripts: 'dist/js/',
    styles: 'dist/css/',
    images: 'dist/img/'
  },
  watch: {
    html: '**/*.html',
    scripts: 'src/js/**/*.js',
    styles: 'src/less/**/*.less',
    images: 'src/img/*.*'
  },
  root: __dirname
};

// Copy images
gulp.task('copy:images', function() {
  return gulp.src(path.src.images)
    .pipe(gulp.dest(path.dist.images))
});

// Work with .less files
gulp.task('styles', function() {
  return gulp.src(path.src.styles)
    .pipe(less())
    .pipe(postcss([
      lost()
    ]))
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
      basename: 'style'
    }))
    .pipe(gulp.dest(path.dist.styles));
});

// Work with .js files
gulp.task('scripts', function() {
  return gulp.src(path.src.scripts)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.scripts))
});

// BrowserSync config
gulp.task('server', function() {
  browsersync({
    server: path.root,
    notify: false,
    open: false
  });

  gulp.watch(path.watch.html, reload);
  gulp.watch(path.watch.styles, ['styles', reload]);
  gulp.watch(path.watch.scripts, ['scripts', reload]);
  gulp.watch(path.watch.images, reload);
});

// Main task aka - gulp
gulp.task('default', [
  'copy:images',
  'styles',
  'scripts',
  'server'
  ]);