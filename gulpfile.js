var gulp = require('gulp'),
	changed = require('gulp-changed'),
	connect = require('gulp-connect'),
	browserify = require("browserify"),
	babelify = require("babelify"),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	runSequence = require('run-sequence'),
	eslint = require('gulp-eslint'),
    nightwatch = require('gulp-nightwatch'),
    karma = require('gulp-karma'),
	less = require('gulp-less');

var DEST = "./dist";


// Watch changes
gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'], ['reloadHtml']);
	gulp.watch(['./app/**/*.js'], ['reloadJs']);
	gulp.watch(['./app/**/*.css'], ['reloadStyles']);
});


// Reload
gulp.task('reloadHtml', ['buildHtml'], function() {
	return gulp.src(DEST+'/**/*.html')
		.pipe(connect.reload());
});
 
gulp.task('reloadJs', ['buildJs'], function() {
   	return gulp.src(DEST+'/src/**/*.js')
		 .pipe(connect.reload());
});

gulp.task('reloadStyles', ['buildStyles'], function() {
	return gulp.src(DEST+'/styles/*.css')
		.pipe(connect.reload());
});

 
// Build
gulp.task('buildJs', function() {
	return gulp.src('./app/src/**/*.js', {base: 'app'})
		.pipe(changed(DEST))
		.pipe(gulp.dest(DEST));
	// return browserify({
	// 	entries: './app/src/app.module.js',
	// 	debug: true
	// })
	// .transform(babelify)
	// .bundle()
	// .pipe(source('bundle.js'))
 //  	.pipe(buffer())
	// .pipe(sourcemaps.init({loadMaps: true}))
 //  	.pipe(sourcemaps.write('./'))
	// .pipe(gulp.dest(DEST+'/src'));
});

gulp.task("buildHtml", function () {
	return gulp.src(['./app/**/*.html'])
		.pipe(changed(DEST))
		.pipe(gulp.dest(DEST));
});

gulp.task("buildStyles", function () {
	return gulp.src('./app/styles/**/*.css', {base: 'app'})
		.pipe(less())
		.pipe(changed(DEST))
		.pipe(gulp.dest(DEST));
});


// Server 
gulp.task('connect', function() {
  connect.server({
    root: DEST,
    livereload: true
  });
});


// Quality check

var unitTestFiles = [
  'app/bower_components/angular/angular.js',
  'app/bower_components/angular-cookies/angular-cookies.js',
  'app/bower_components/angular-mocks/angular-mocks.js',
  'app/bower_components/angular-ui-router/release/angular-ui-router.js',
  'app/bower_components/angular-ui-grid/ui-grid.js',
  'app/bower_components/angular-ui-router/release/angular-ui-router.js',
  'app/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
  'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'app/bower_components/bootstrap-ui-treeview/dist/tree-view.js',
  'app/src/**/*.js',
  'test/unit/**/*.js'
];

gulp.task('lint', function () {
	return gulp.src(['app/src/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('unitTest', function() {
  return gulp.src(unitTestFiles)
	.pipe(karma({
	  configFile: 'test/karma.conf.js',
	  action: 'run'
	}))
	.on('error', function(err) {
	  // Make sure failed tests cause gulp to exit non-zero 
	  throw err;
	});
});

gulp.task('e2eTest', function(){
  return gulp.src('test/e2e-nightwatch/*.js')
    .pipe(nightwatch({
      configFile: 'test/nightwatch.json'
      // cliArgs: [ '--env chrome', '--tag sandbox' ]
    }));
});
 

// Bundle tasks

gulp.task('qualityCheck', function() {
	runSequence("lint", "unitTest", "e2eTest");
});

gulp.task('build', ['buildJs', 'buildHtml', 'buildStyles']);

gulp.task('reload', ['reloadJs', 'reloadHtml', 'reloadStyles']);

gulp.task('default', ['watch'], function() {
	runSequence('build', 'connect');
});
