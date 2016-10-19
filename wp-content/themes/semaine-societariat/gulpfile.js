/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @authors Florian Panchout
 * @package wp-gulp-theme
 */


// Project configuration
var url 			= 'http://dev.semaine-societariat.fr/', // Local Development URL for BrowserSync. Change as-needed.
	vendorsJsFiles  = [
						'./node_modules/gsap/src/minified/TweenMax.min.js', 
						'./node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
						'./node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
						'./node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
						'./node_modules/jquery-mousewheel/jquery.mousewheel.js',
						'./node_modules/slick-carousel/slick/slick.min.js',
						'./node_modules/jquery.easing/jquery.easing.min.js',
						'./node_modules/imagesloaded/imagesloaded.pkgd.min.js',
						'./node_modules/mobile-detect/mobile-detect.min.js'
					]

// Load plugins
var gulp     = require('gulp'),
	browserSync  = require('browser-sync'), // Asynchronous browser loading on .scss file changes
	reload       = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
	minifycss    = require('gulp-uglifycss'),
	uglify       = require('gulp-uglify'),
	imagemin     = require('gulp-imagemin'),
	newer        = require('gulp-newer'),
	rename       = require('gulp-rename'),
	concat       = require('gulp-concat'),
	runSequence  = require('gulp-run-sequence'),
	sass         = require('gulp-sass'),
	plugins      = require('gulp-load-plugins')({ camelize: true }),
	ignore       = require('gulp-ignore'), // Helps with ignoring files and directories in our run tasks
	plumber      = require('gulp-plumber'), // Helps prevent stream crashing on errors
	cache        = require('gulp-cache'),
	spritesmith	 = require('gulp.spritesmith'),
	watch 		 = require('gulp-watch'),
	stripDebug 	 = require('gulp-strip-debug'),
	merge2 		 = require('merge2');


/**
 * Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: url
    });
});


/**
 * Styles
 *
 * Take all scss files, process, concat, minify, autoprefix and send theme to build
*/
gulp.task('styles', function () {
	return 	gulp.src('./src/scss/*.scss')
			.pipe(plumber())
			.pipe(sass({
				errLogToConsole: true,
				outputStyle: 'compact',
				precision: 10
			}))
			.pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(minifycss({
				maxLineLen: 80
			}))
			.pipe(rename('style.css'))
			.pipe(plumber.stop())
			.pipe(gulp.dest('./build'))
});


/**
 * Scripts: Vendors
 *
 * Take all bower js files, concat, minify and send theme to build
*/
gulp.task('vendorsJs', function() {
	return 	gulp.src(vendorsJsFiles)
				.pipe(concat('vendors.js'))				
				.pipe(gulp.dest('./build/js/'))
});


/**
 * Scripts: Custom
 *
 * Take all js in js directory, concat, minify and send to build
*/
gulp.task('scriptsJs', function() {
	return 	gulp.src(['./src/js/main.js','./src/js/*.js'])
				.pipe(plumber())
				.pipe(concat('custom.js'))
				.pipe(gulp.dest('./build/js'))
				.pipe(rename( {
					basename: "custom",
					suffix: '.min'
				}))
				.pipe(stripDebug())
				.pipe(uglify())
				.pipe(gulp.dest('./build/js/'))
});


/**
 * php
 *
 * Take all php and send to build
*/
gulp.task('php', function() {
	return 	gulp.src('./src/**/*.php')
				.pipe(gulp.dest('./build/'))
});


/**
 * Images
 *
 * Look at src/img, optimize the images and send them to build
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
	return 	gulp.src(['./src/img/*.{png,jpg,gif}'])
				.pipe(newer('./build/img/'))
				.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
				.pipe(gulp.dest('./build/img/'))
});


/**
 * svg
 *
 * Look at src/img/svg and send them to build
*/
gulp.task('svg', function() {

// Add the newer pipe to pass through newer images only
	return 	gulp.src(['./src/img/svg/*.svg'])
				.pipe(newer('./build/img/svg'))
				.pipe(gulp.dest('./build/img/svg'))
});


/**
 * Sprites
 *
 * Take images in src/img/sprites and make a sprite to build
*/
gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('./src/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    retinaImgName: 'sprite@2x.png',
    retinaSrcFilter: ['./src/img/sprites/*@2x.png'],
    cssName: '_sprite.scss',
    imgPath: 'img/sprite.png',
    retinaImgPath: 'img/sprite@2x.png',

  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('./src/scss/'));

  // Return a merged stream to handle both `end` events
  return merge2(imgStream, cssStream);
});


gulp.task('default', function () {
    watch('./src/img/*.{png,jpg,gif}', function () {
    	runSequence('images', function() {reload()});
    });
    watch('./src/img/sprites/*.png', function () {
    	runSequence('sprite', function() {reload()});
    });
    watch('./src/img/svg/*.svg', function () {
    	runSequence('svg', function() {reload()});
    });
    watch('./src/scss/**/*.scss', function () {
    	runSequence('styles', function() {reload()});
    });
    watch('./src/js/**/*.js', function () {
    	runSequence('scriptsJs', function() {reload()});
    });
    watch('./src/**/*.php', function () {
    	runSequence('php', function() {reload()});
    });

    runSequence('images', 'sprite', 'svg', 'styles', 'scriptsJs', 'vendorsJs', 'php', 'browser-sync');
});
