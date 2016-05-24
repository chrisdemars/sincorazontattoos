// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
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

gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serve']);
