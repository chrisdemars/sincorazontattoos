'use strict';

var gulp              = require('gulp'),
    imagemin          = require('gulp-imagemin'),
    sass              = require('gulp-sass'),
    cssmin            = require('gulp-cssmin'),
    rename            = require('gulp-rename'),
    prefix            = require('gulp-autoprefixer'),
    uglify            = require('gulp-uglify'),
    concat            = require('gulp-concat'),
    browserSync       = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './',
        browser: "google chrome"
    });

    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/img/**/*.+(png|jpg|gif|svg)')
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Configure CSS.
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

// Configure image stuff.
gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Watch the things.
gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/img/**/*.+(png|jpg|gif|svg)')
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'images', 'serve']);
