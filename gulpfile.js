'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

/*

    DOJO Build Process

 */

// Clean out the dist directory
gulp.task('clean-dist', function() {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

// Build the Dojo App
gulp.task('dojo', ['clean-dist'], function() {
    var cmd = spawn('node', [
        'src/dojo/dojo.js',
        'load=build',
        '--profile',
        'build.profile.js',
        '--releaseDir',
        '../dist'
    ], { stdio: 'inherit' });

    return cmd.on('close', function (code) {
        console.log('Dojo build completed ' + (code === 0 ? 'successfully!' : 'with issues.'));
        cb(code);
    });
});

// Dojo outputs uncompresssed files.
// Remove these for a release build.
gulp.task('clean-uncompressed', ['dojo'], function () {
    return gulp.src('dist/**/*.uncompressed.js', { read: false })
        .pipe(clean());
});

// Copy an html file configured for release build
gulp.task('copy', ['clean-uncompressed'], function () {
    return gulp.src('src/built.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['copy']);

/*

    End DOJO Build Process

 */

/*************************************************/

/*

    SASS Handling

 */

gulp.task('sass', ['fonts'], function() {
    return gulp.src('./src/assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
                outputStyle: 'compressed',
                includePaths: [
                    './node_modules/bootstrap-sass/assets/stylesheets',
                    './node_modules/font-awesome/scss'
                ]
            }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
});


/*************************************************/

/*

 Font Handling

 */

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
        './node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('src/assets/fonts/'));
});



