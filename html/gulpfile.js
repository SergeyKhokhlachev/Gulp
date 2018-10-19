'use strict';

const gulp = require('gulp'),
	  browserSync = require('browser-sync').create(),
	  fileinclude = require('gulp-file-include'),
	  rename = require('gulp-rename'),
	  clean = require('gulp-clean'),
	  postcss = require('gulp-postcss'),
	  assets  = require('postcss-assets'),
	  autoprefixer = require('autoprefixer'),
	  cssimport = require('gulp-cssimport'),
	  postcssNested = require('postcss-nested'),
	  postCSSCustomProperties = require('postcss-custom-properties'),
	  customMedia = require('postcss-custom-media'),
	  cssmin = require('gulp-cssmin'),
	  imagemin = require('gulp-imagemin'),
	  sourcemaps = require('gulp-sourcemaps');


/* ============= html ============= */

gulp.task('html', function () {
	return gulp.src('src/pages/*.html')
		.pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
		.pipe(gulp.dest('build'))
		.on('end', browserSync.reload);
});



/* ============= css ============= */
gulp.task('css', function () {
 	var plugins = [
 		postcssNested,
 		customMedia(),
 		postCSSCustomProperties(),
 		assets({
 			cache: true,
 			basePath: 'src',
 			relative: 'css',
 			loadPaths: ['img']
 		}),
 		autoprefixer({ grid: true, browsers: ['last 2 versions', 'ie 10-11', 'Firefox > 20']  })	
 	];
    return gulp.src('src/css/main.css')
    	.pipe(sourcemaps.init())
    	.pipe(cssimport())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.')) 
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
        	stream: true
        }));
});

gulp.task('css:min', function () {
 	var plugins = [
 		postcssNested,
 		customMedia(),
 		postCSSCustomProperties(),
 		assets({
 			cache: true,
 			basePath: 'src',
 			relative: 'css',
 			loadPaths: ['img']
 		}),
 		autoprefixer({ grid: true, browsers: ['last 2 versions', 'ie 10-11', 'Firefox > 20']  })	
 	];
    return gulp.src('src/css/main.css')
    	.pipe(sourcemaps.init())
    	.pipe(cssimport())
        .pipe(postcss(plugins))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.')) 
        .pipe(gulp.dest('build/css'))
});

gulp.task('css:libs', function () {
    return gulp.src('src/css/libs.css')
    	.pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
	    .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});
 


/* ============= js ============= */
gulp.task('scripts',  function () {
    return gulp.src('src/js/main.js')
    	.pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({
        	stream: true
        }));
});

gulp.task('scripts:demo',  function () {
    return gulp.src('src/js/demo.js')
    	.pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
        .pipe(gulp.dest('build/js'))
});


gulp.task('scripts:libs', function () {
    return gulp.src('src/js/libs.js')
    	.pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
        .pipe(gulp.dest('build/js'));
});




/* ============= image ============= */
gulp.task('image', function () {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('image:min', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]))
        .pipe(gulp.dest('build/img'));
});


/* ============= tool ============= */
gulp.task('clean', function () {  
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});



/* ============= watch ============= */
gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/**/*.css', gulp.series('css'));
    gulp.watch('src/**/*.js', gulp.series(
    	gulp.parallel(
			'scripts',
			'scripts:demo'
		)
    ));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
});




/* ============= dev ============= */
gulp.task('dev', gulp.series(
	gulp.parallel(
		'html', 
		'css', 
		'scripts',
		'scripts:demo', 
		'fonts', 
		'image'
	),
	gulp.parallel(
		'watch', 
		'browser-sync'
	)
));


/* ============= build ============= */
gulp.task('build', gulp.series(
	'clean', 
	gulp.parallel(
		'html', 
		'css',
		'css:min', 
		'css:libs',
		'scripts',
		'scripts:demo', 
		'scripts:libs',
		'fonts',
		'image:min'
	)
));







