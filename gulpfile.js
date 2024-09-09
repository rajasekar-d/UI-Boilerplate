const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
});

// Copy Assets
gulp.task('copy-assets', function() {
    return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Copy HTML
gulp.task('copy-html', function() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Serve and Watch
gulp.task('serve', function() {
  browserSync.init({
    server: 'dist',
    port: 3000
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/assets/**/*', gulp.series('copy-assets'));
  gulp.watch('src/**/*.html', gulp.series('copy-html'));
});

// Default Task
gulp.task('default', gulp.parallel('sass', 'copy-assets', 'copy-html', 'serve'));