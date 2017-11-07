import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import notify from 'gulp-notify';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import gulpIf from 'gulp-if';

import { CONFIG } from './../constants';

/**
 * SCSS Task
 * 
 * Compiles the MOT public scss file to a css file using sass and postcss with
 * autoprefixer and cssnano plugins.
 * 
 * CSS Plugins: 
 * ------------
 *  - Autoprefixer (https://autoprefixer.github.io/)
 *    Adds browsers compatibility css.
 * 
 *  - CSS Nano (http://cssnano.co)
 *    Compresses the outputted css file to be as compact as possible.
 *    Only used in production build.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.task('scss', () => {
  return gulp.src(path.join(CONFIG.sourcePaths.scss, CONFIG.patterns.scss))
    // Enable source maps for development
    .pipe(gulpIf(!CONFIG.isProduction(), sourcemaps.init()))
    // Include node_modules folder to allow for imports
    .pipe(sass({
      includePaths: [
        'node_modules'
      ]
    }))
    // If error occures, display error instead of crashing
    .on("error", notify.onError("Error: <%= error.message %>"))
    // Add browser specific prefixes
    .pipe(autoprefixer({
      browsers: [
        'ie 8',
        'ie 9',
        'ie 10',
        'ie 11',
        'last 2 versions'
      ]
    }))
    // If in production, minify the css
    .pipe(gulpIf(CONFIG.isProduction(), cssnano({
      minifyFontValues: false,
      discardComments: {
        removeAll: true,
      },
    })))
    // Output source maps for development
    .pipe(gulpIf(!CONFIG.isProduction(), sourcemaps.write('./')))
    // Output compiled css to the distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.css));
});