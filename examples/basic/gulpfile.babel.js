import gulp from 'gulp';
import replace from 'gulp-replace'
import rename from 'gulp-rename'

gulp.task('prod', ()=> {
  return gulp
    .src(['./app.js'])
    .pipe(replace('{debug}', false))
    .pipe(rename('temp.app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('dev', ()=> {

  return gulp
    .src(['./app.js'])
    .pipe(replace('{debug}', true))
    .pipe(rename('temp.app.js'))
    .pipe(gulp.dest('./'));
});
