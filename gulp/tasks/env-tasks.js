import gulp from 'gulp';
import path from 'path';

import { CONFIG } from './../constants';

/**
 * Watch Dev Task
 * 
 * Watches any scss and image files for changes and then runs the appropriate gulp task.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('watch-dev', gulp.series('copy-images', 'copy-fonts', 'copy-misc', 'scss', 'javascript-ie-shims', () => {

    // Watch all scss files inside of the source folder
    // If any changes occur then run the scss task
    gulp.watch(path.join(CONFIG.sourcePaths.scss, CONFIG.patterns.scss), gulp.parallel('scss'));

    // Watch all IE shims js changes
    // If any changes occur then run javascripts-ie-shims task
    gulp.watch(path.join(CONFIG.sourcePaths.js, 'ie-shims', CONFIG.patterns.js), gulp.parallel('javascript-ie-shims'));

}));

/**
 * Build Production
 * 
 * Builds a production distribution package.
 * - Compiles SCSS with postcss, autoprefixer and cssnano.
 * - Copies all images from govuk and compresses them with imagemin.
 * - Concatenates and uglifies all govuk javascript assets.
 * 
 * Required NODE_ENV to be set to 'production'
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('build-production', gulp.series('copy-images', 'copy-fonts', 'copy-misc', 'scss', 'javascript-ie-shims'));