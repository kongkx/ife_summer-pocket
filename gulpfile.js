var gulp = require('gulp');
var concat =  require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var browserSync = require('browser-sync');


gulp.task('sass', function() {
  return gulp.src('sass/*.scss').pipe(sass()).pipe(gulp.dest('style'));
});

gulp.task('copy-html', function() {
  return gulp.src(['./*.html','!test.html']).pipe(gulp.dest('dist'));
});

gulp.task('copy-style', function() {
  return gulp.src('style/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/style'));
});

gulp.task('copy-script', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      base: './dist/'
    }
  });
  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dis', ['copy-html', 'copy-style', 'copy-script']);

gulp.task('default',['browser-sync'], function() {
  gulp.watch('./*.html', ['copy-html']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('js/*js', ['copy-script']);
  gulp.watch('style/*.css', ['copy-style']);
});
