var gulp = require('gulp');
var del = require('del');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var plumber = require('gulp-plumber');
var cmq = require('gulp-combine-media-queries');


// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dev'));

});

gulp.task('html-build', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

    return gulp.src('dev/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist'));

});


// CSS
gulp.task('css', function() {
    return sass('src/assets/scss/main.scss', { style: 'expanded' })
        .pipe( plumber() )
        .pipe( autoprefixer('last 2 version') )
        .pipe( cmq({
            log: true
        }))
        .pipe( gulp.dest('dev/assets/css') )
});

gulp.task('css-build', function() {
    return gulp.src('dev/assets/css/*')
        .pipe( rename({suffix: '.min'}) )
        .pipe( minifycss() )
        .pipe( gulp.dest('dist/assets/css') )
})




// Initialize development
gulp.task('default', function() {
    gulp.start('html', 'css');
});

// Watch for changes during development
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['html']);

    // Watch .scss files
    gulp.watch('src/assets/scss/**/*', ['css']);

});


// Deploy... great success!
gulp.task('build', function() {
    gulp.start('html-build', 'css-build');
});

