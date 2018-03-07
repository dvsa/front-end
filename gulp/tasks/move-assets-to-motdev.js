import gulp from 'gulp';
import path from 'path';

import { CONFIG } from './../constants';

/**
 * Move Assets to MOTDEV
 * 
 * It will move all assets to the MOTDEV local enviroment
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.1.0
 */
gulp.task('move-assets-to-motdev', () => {
  return gulp.src(path.join(CONFIG.distPaths.base, '**/*'))
    // Outputs file to the MOTDEV folder
    .pipe(gulp.dest(CONFIG.motDevAssetsFolderPath));
});

/**
 * Runs the move assets to motdev folder in watch mode
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('move-assets-to-motdev-watch', gulp.series('move-assets-to-motdev', () => {

  gulp.watch(path.join(CONFIG.distPaths.base, '**/*'), gulp.parallel('move-assets-to-motdev'));

}));