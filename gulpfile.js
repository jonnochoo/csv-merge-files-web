var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('default', ['lint']);

gulp.task('lint', function () {
  return gulp.src(['routes/*.js', 'public/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
