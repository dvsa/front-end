import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import cssmqpacker from 'css-mqpacker';
import notify from 'gulp-notify';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import gulpIf from 'gulp-if';
import moment from 'moment';
import replace from 'gulp-replace';

import { CONFIG } from './../constants';
import * as PACKAGE_JSON from './../../package.json';

/**
 * SCSS Task
 * 
 * Compiles the MOT public scss file to a css file using sass and postcss with
 * autoprefixer and cssnano plugins.
 * 
 * PostCSS Plugins: 
 * ------------
 *  - Autoprefixer (https://autoprefixer.github.io/)
 *    Adds browsers compatibility css.
 * 
 *  - CSS MQPacker
 *    Bundles all media queries into one
 * 
 *  - CSS Nano (http://cssnano.co)
 *    Compresses the outputted css file to be as compact as possible.
 *    Only used in production build.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.1.0
 */
gulp.task('scss', () => {
  // Setup postcss plugins
  let postcssPlugins = [
    // Adds browser specific prefixes
    autoprefixer({
      browsers: [
        'ie 8',
        'ie 9',
        'ie 10',
        'ie 11',
        'last 2 versions'
      ]
    }),
    cssmqpacker()
  ];

  if(CONFIG.isProduction()) {
    postcssPlugins.push(
      // Minify the outputted css
      cssnano({
        preset: 'advanced',
        minifyFontValues: false
      })
    );
  }

  return gulp.src(path.join(CONFIG.sourcePaths.scss, CONFIG.patterns.scss))
    // Enable source maps for development
    .pipe(gulpIf(!CONFIG.isProduction(), sourcemaps.init()))
    // Add package data
    .pipe(replace('{{packageName}}', PACKAGE_JSON.name))
    .pipe(replace('{{packageVersion}}', PACKAGE_JSON.version))
    .pipe(replace('{{packageAuthor}}', PACKAGE_JSON.author))
    .pipe(replace('{{packageContributors}}', PACKAGE_JSON.contributors.join(', ')))
    .pipe(replace('{{packageTimestamp}}', moment().format('MMMM Do YYYY, h:mm:ss a')))
    // Include node_modules folder to allow for imports
    .pipe(sass({
      includePaths: [
        'node_modules'
      ]
    }))
    // If error occures, display error instead of crashing
    .on("error", notify.onError("Error: <%= error.message %>"))
    // Use postcss for plugins
    .pipe(postcss(postcssPlugins))
    // Output source maps for development
    .pipe(gulpIf(!CONFIG.isProduction(), sourcemaps.write('./')))
    // Output compiled css to the distribution folder
    .pipe(gulp.dest(CONFIG.distPaths.css));
});