import gulp from 'gulp';
import path from 'path';

import { CONFIG } from './../constants';

/**
 * Copy Misc
 * 
 * Copies all misc source files into distribution folder.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('copy-misc', () => {
  return gulp.src(path.join(CONFIG.sourcePaths.misc, '**/*.*'))
    // Outputs file to the distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.misc));
});