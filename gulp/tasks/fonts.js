import gulp from 'gulp';
import path from 'path';

import { CONFIG } from './../constants';

/**
 * Copy Fonts
 * 
 * Moves the govuk fonts from the source folder to the distribution folder.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('copy-fonts', () => {
  return gulp.src(path.join(CONFIG.sourcePaths.fonts, CONFIG.patterns.font))
    // Outputs file to the distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.fonts));
});