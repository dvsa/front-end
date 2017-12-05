import gulp from 'gulp';
import path from 'path';
import concat from 'gulp-concat';

import { CONFIG } from './../constants';

/**
 * Javascript IE Shims
 * 
 * Bundles all IE shims
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('javascript-ie-shims', () => {
  return gulp.src(path.join(CONFIG.sourcePaths.js, 'ie-shims', CONFIG.patterns.js))
    // Concatenate and Rename output filename
    .pipe(concat('ie-shims.bundle.js'))
    // Outputs file to the distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.js));
});