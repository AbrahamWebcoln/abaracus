var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css')

gulp.task('pack-js', function () {    
    return gulp.src(['js/modernizr.custom.js','js/triple.layout.js', 'js/nprogress/nprogress.js', 'js/fastclick.js', 'js/jquery.imagesloaded.min.js', 'js/jquery.isotope.min.js', 'js/jquery.validate.min.js', 'js/fancy3.js', 'js/guestures.js', 'js/google-code-prettify/prettify.js', 'js/send-mail.js', 'js/classie.js', 'js/main.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('js'));
});

gulp.task('pack-css', function () {    
    return gulp.src(['js/nprogress/nprogress.css', 'js/google-code-prettify/prettify.css', 'css/print.css', 'css/normalize.css', 'css/animate.css', 'css/fancy.min.css', 'css/flexslider.css', 'css/style.css', 'css/main.css', 'css/custom.css'])
        .pipe(concat('main-stylesheet.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('css'));
});

gulp.task('default', gulp.series('pack-js','pack-css')); 