'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    clean = require('gulp-clean'),
    fs = require('fs');

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

    CSS Handling

 */

gulp.task('sass', function() {
    return gulp.src('./src/assets/sass/*.scss')
        .pipe(sass.sync({
                outputStyle: 'compressed',
                includePaths: [
                    './node_modules/bootstrap-sass/assets/stylesheets',
                    './node_modules/font-awesome/scss'
                ]
            }).on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/sass'));
});

gulp.task('runsass',['postcss'], function() {
    var cssFile = './src/assets/sass/styles.css';
    if(fs.existsSync(cssFile)){
        gutil.log(
            'file found'
        );
        return gulp.src('./src/assets/sass/*.css', { read: false })
            .pipe(clean());
    } else {
        gutil.log('no file found');
    }
});


gulp.task('sass:watch', function(){
    gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
});


gulp.task('postcss', ['sass'], function() {
    return gulp.src('./src/assets/sass/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({browsers: ['last 2 versions']}) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/assets/css'))
});

/*

  End CSS Handling

 */


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

/*

 End Font Handling

 */

gulp.task('default', ['runsass','fonts'], function() {

});



