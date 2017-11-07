import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import { CONFIG } from './../constants';

/**
 * Javascript Vendor
 * 
 * Copies all vendor js file from source directory into the distribution directory.
 * If in production, it will also uglify the output.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0 
 */
gulp.task('javascript-vendor', () => {
  // Read all vendor js files from npm package
  return gulp.src(CONFIG.jsVendorFilesList)
    // Concatenate all vendor js files
    .pipe(concat('vendor.bundle.js'))
    // Uglify if in production
    .pipe(gulpIf(CONFIG.isProduction(), uglify({
      ie8: true
    })))
    // Output to distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.js));
});