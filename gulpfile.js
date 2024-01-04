var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass =  require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', done => {
    gulp.src("src/styles/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/styles/css/"))
        .pipe(browserSync.stream());
    done();
});

gulp.task('watch', (done) => {
    gulp.watch('./src/styles/scss/**/*.scss', gulp.series('sass'));
})

gulp.task('serve', done => {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
         }
    });
    gulp.watch("src/styles/sass/*.sass", gulp.series('sass'));
    gulp.watch(["*.html", "src/styles/sass/*.sass", "src/js/*.js"]).on('change', () => {
      browserSync.reload();
      done();
    });

    done();
});

gulp.task('default', gulp.series('sass', 'serve', 'watch'));
