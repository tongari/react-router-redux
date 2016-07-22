import gulp from 'gulp';
import replace from 'gulp-replace'

gulp.task('prod', function () {
  return gulp
    .src(['./app.js'])
    .pipe(replace('{true}', '{false}'))
    .pipe(gulp.dest('./app/js'));
});
