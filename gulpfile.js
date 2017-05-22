const PATH = {
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    js_vendor: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/angular/angular.min.js',
        '.node_modules/bootstrap/dist/js/bootstrap.min.js'
    ],
    css_vendor: [
        './node_modules/bootstrap/css/bootstrap.min.css',
        './node_modules/bootstrap/css/bootstrap-theme.min.css',
        './node_modules/font-awesome/css/font-awesome.min.css'
    ],
    fonts_vendor: [
        './node_modules/bootstrap/fonts/**',
        './node_modules/font-awesome/fonts/**'
    ],
    DIST: './dist',
    static: [
        './src/index.html'
    ]
};

//
// Modules
// ======================================================
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const $ = require('gulp-load-plugins')();
const os = require('os');
const babel = require('gulp-babel');


// Styles (SCSS + autoprefixer + minify)
// ======================================================
gulp.task('styles', function () {
    return gulp.src(PATH.scss)
        .pipe($.sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe($.autoprefixer({browsers: ['last 10 version']}))
        .pipe($.csso())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.DIST + '/css'))
        .pipe(browserSync.stream());
});

/**
 * js task
 */
gulp.task('js', function () {
    return gulp.src(PATH.js)
        .pipe($.sourcemaps.init())
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.DIST + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('js-vendor', function () {
    return gulp.src(PATH.js_vendor)
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(PATH.DIST + '/js'))
});

/**
 * css task
 */
gulp.task('css-vendor', function () {
   return gulp.src(PATH.css_vendor)
       .pipe($.concat('vendor.css'))
       .pipe(gulp.dest(PATH.DIST + '/css'))
       .pipe(browserSync.stream());
});

/**fonts task
 *
 */
gulp.task('fonts-vendor', function () {
   return gulp.src(PATH.fonts_vendor)
       .pipe(gulp.dest(PATH.DIST + '/fonts'))
       .pipe(browserSync.stream());
});

/**copy task
 *
 */
gulp.task('copy', function () {
    return gulp.src(PATH.static, {base: 'src'})
        .pipe(gulp.dest(PATH.DIST));
});

// Static server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            notify: true
        }
    });

    // Watch .scss files
    gulp.watch(PATH.scss, ['styles']);

    // // Watch .js files
    gulp.watch(PATH.js, ['js']);

    // Watch vendor.js
    gulp.watch(PATH.js_vendor, ['js-vendor']);
    //
    // // Watch image files
    //gulp.watch('./img/**/*', ['image']);

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Initialization
gulp.task('default', ['styles', 'js', 'js-vendor', 'fonts-vendor', 'copy', 'serve']);