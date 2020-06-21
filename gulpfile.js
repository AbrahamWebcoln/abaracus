var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css')

gulp.task('pack-js', function () {    
    return gulp.src(['js/*.js',])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('js'));
});

gulp.task('pack-css', function () {    
    return gulp.src(['js/nprogress/nprogress.css', 'js/google-code-prettify/prettify.css', 'css/print.css', 'css/normalize.css', 'css/bootstrap.min.css', 'css/animate.css', 'css/fancy.min.css', 'css/flexslider.css', 'css/style.css', 'css/main.css', 'css/custom.css'])
        .pipe(concat('main-stylesheet.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('default', gulp.parallel('pack-js','pack-css')); 