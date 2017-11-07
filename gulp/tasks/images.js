import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import path from 'path';
import gulpIf from 'gulp-if';

import { CONFIG } from './../constants';

/**
 * Copy Images
 * 
 * Moves the image assets to the distribution folder.
 * If in production, it will also compresses images with imagemin.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('copy-images', () => {
  return gulp.src(path.join(CONFIG.sourcePaths.images, CONFIG.patterns.image))
    // Compress image if in production
    .pipe(gulpIf(CONFIG.isProduction(), imagemin({
      optimizationLevel: 3
    })))
    // Output to distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.images));
});