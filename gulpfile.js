'use strict';

var gulp              = require('gulp'),
    imagemin          = require('gulp-imagemin'),
    sass              = require('gulp-sass'),
    cssmin            = require('gulp-cssmin'),
    rename            = require('gulp-rename'),
    prefix            = require('gulp-autoprefixer'),
    browserSync       = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './',
        browser: "google chrome canary"
    });

    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serve']);
