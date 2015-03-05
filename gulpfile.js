var gulp = require("gulp"),
    gutil = require("gulp-util"),
    coffee = require("gulp-coffee");

gulp.task('build', function() {
  gulp.src('src/*.coffee')
    .pipe(coffee({bare:true})).on('error', gutil.log)
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('example'));

  gulp.src('bower_components/angular/angular.js')
    .pipe(gulp.dest('example'));
});
